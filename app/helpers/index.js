const axios = require("axios");
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Input, message } from 'antd';
import { useEffect, useState } from 'react';


const baseapi = 'http://localhost:4000/api';

export const fetchData = async (route) => {
    let result = await axios.get(`${baseapi}${route}`)
        .then(response => response.data.data)
        .catch(error => { throw error })

    return result;
}

export const addRecord = async (route, data) => {
    let result = await axios.post(`${baseapi}${route}`, data)
        .then(response => response.data)
        .catch(error => { throw error })

    return result;
}

export const updateRecord = async (route, data) => {
    let result = await axios.patch(`${baseapi}${route}`, data)
        .then(response => response.data)
        .catch(error => { throw error })

    return result;
}

export const deleteRecord = async (route, id) => {
    let result = await axios.delete(`${baseapi}${route}`, { data: { id: id } })
        .then(response => response.data)
        .catch(error => { throw error })

    return result;
}

export const exportToExcel = (data, filename) => {
    message.loading('Processing', 2)
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Buffer to store the generated Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

    saveAs(blob, `${filename}.xlsx`);
};

export const UploadXLS = (props) => {
    const [fileData, setFileData] = useState([]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const binaryString = event.target.result;
            const workbook = XLSX.read(binaryString, { type: 'binary' });
            const sheetName = workbook.SheetNames[0]; // Assuming you have only one sheet
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Convert array of arrays to array of objects (assuming first row contains column headers)
            const formattedData = data.slice(1).map((row) =>
                row.reduce((acc, val, index) => {
                    const columnHeader = data[0][index];
                    acc[columnHeader] = val;
                    return acc;
                }, {})
            );

            setFileData(formattedData);
        };

        reader.readAsBinaryString(file);

    };

    // Update state only when fileData changes
    
    useEffect(() => {
        if (fileData.length > 0) {
            fileData.map((data)=>{
                let tmp=addRecord( props.url, data);
                tmp.then(response=>{
                    message.success(`Data with ID ${data.id} saved successfully`)
                }).catch(error=>{
                    message.error(error);
                })
            })
            message.info('Upload : 100%')
        }
    }, [fileData]);


    return (
        <input type="file" accept=".xls,.xlsx" className='bg-white' onChange={handleFileUpload} />
    );
};