'use client';
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Popconfirm, Select, Space, Table, Tag, message } from 'antd';
import type { FormProps, PopconfirmProps, TableProps } from 'antd';
import { PlusOutlined, SaveOutlined, SendOutlined } from '@ant-design/icons';
import { fetchData, addRecord, updateRecord, deleteRecord, exportToExcel, UploadXLS } from '../helpers'

interface DataType {
    id: number;
    student_id: number,
    type: string,
    date: string,
    score: string,
}


const { Search } = Input;


const Test = () => {
    // modal 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [saveLoading, setSaveLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [data, setData] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        let tempData = fetchData('/tests');
        tempData.then(response => setData(response))

    }, [data])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        setSaveLoading(true);
        let tempSubmit;
        if (isEditing) {
            tempSubmit = updateRecord('/tests', values);
        } else {
            tempSubmit = addRecord('/tests', values);
        }
        tempSubmit.then(result => {
            if (result.success === 1) {
                message.success(result.message);
                setIsModalOpen(false);
                form.resetFields();
                setData([...data, values]);

            } else {
                message.error(result.message);
            }
            setSaveLoading(false);
            setIsEditing(false);
        })
    };

    const OpenEdition = (record: object) => {
        form.setFieldsValue({
            id: record.id,
            student_id: record.student_id,
            type: record.type,
            date: record.date,
            score: record.score,
        });
        setIsEditing(true);
        setIsModalOpen(true);
    }

    const confirm: PopconfirmProps['onConfirm'] = (record) => {
        setDeleteId(record.id);
        let tempDelete = deleteRecord('/tests', record.id);
        tempDelete.then(response => {
            if (response.success === 1) {
                console.log(response)
                message.success(response.message);
                setData([...data, data.filter((elt) => elt.id !== record.id)]);
            } else {
                message.error(response.message)
            }
            setDeleteId(0);
        })


    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        setIsEditing(false);
    };


    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Student ID',
            dataIndex: 'student_id',
            key: 'student_id',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (_, record) => (
                <Tag color='green'>{record.type}</Tag>
            )
        }, {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type='dashed' onClick={() => OpenEdition(record)}>Update</Button>
                    <Popconfirm
                        title="Confirmation"
                        description="Are you sure to delete this record ?"
                        onConfirm={() => confirm(record)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger loading={deleteId === record.id ? true : false}>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];


    return (
        <div className='w-full p-4'>
            <h2 className='text-4xl font-bold ml-6 text-blue-300'>Tests ({data ? data.length : 0})</h2>
            {/* filters */}
            <div className='flex p-2 m-4 float-right'>
                <UploadXLS url={'/tests'} />

                <Button className='ml-2 mr-4' type="dashed" icon={<SendOutlined />} size='middle' onClick={() => exportToExcel(data, 'test')}>Export data</Button>
                <Search placeholder="Search" style={{ width: 200 }} />
                <Button className='ml-2' type='primary' icon={<PlusOutlined />} size='middle' onClick={() => { setIsEditing(false); showModal() }}>Add a new Test</Button>
            </div>
            {/* data grid */}
            <Table bordered className='ml-4 mr-4' rowKey={'id'} columns={columns} dataSource={data ? data : []} />
            <Modal title={isEditing ? "Update this Test" : "Create new Test"} open={isModalOpen} centered onOk={handleOk} onCancel={handleCancel} footer={false}>
                <Form
                    name="tests"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 400, marginTop: 10 }}
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item<FieldType>
                        label="id"
                        name="id"
                        rules={[{ required: true, message: 'Please type a valid number !' }]}
                    >
                        <Input disabled={isEditing ? true : false} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Student ID"
                        name="student_id"
                        rules={[{ required: true, message: 'Please type the student ID!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Please enter a valid type!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Date"
                        name="date"
                        rules={[{ required: true, message: 'Please enter the date!' }]}
                    >
                        <Input type='date' />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Score"
                        name="score"
                        rules={[{ required: true, message: 'Please enter the score !' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} style={{ float: 'right' }}>
                            {isEditing ? 'Update' : 'Save'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
};

export default Test;