'use client';
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Popconfirm, Select, Space, Table, Tag, message } from 'antd';
import type { FormProps, PopconfirmProps, TableProps } from 'antd';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { fetchData, addRecord, updateRecord, deleteRecord } from '../helpers'

interface DataType {
    id: number;
    pseudonym: string,
    name: string,
    email: string,
    age: number,
    gender: string,
    grade_level: number
}


const { Search } = Input;


const Students = () => {
    // modal 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [saveLoading, setSaveLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [data, setData] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        let tempData = fetchData('/students');
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
            tempSubmit = updateRecord('/students', values);
        } else {
            tempSubmit = addRecord('/students', values);
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

    const OpenEdition = (record) => {
        form.setFieldsValue({
            id: record.id,
            pseudonym: record.pseudonym,
            name: record.name,
            email: record.email,
            age: record.age,
            gender: record.gender,
            grade_level: record.grade_level
        });
        setIsEditing(true);
        setIsModalOpen(true);
    }

    const confirm: PopconfirmProps['onConfirm'] = (record) => {
        // console.log(id);
        // message.success('Click on Yes');
        setDeleteId(record.id);

        let tempDelete = deleteRecord('/students', { "id": record.id });
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
            title: 'Pseudonym',
            dataIndex: 'pseudonym',
            key: 'pseudonym',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Grade level',
            dataIndex: 'grade_level',
            key: 'grade_level',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type='dashed' onClick={() => OpenEdition(record)}>Update</Button>
                    <Popconfirm
                        title="Confirmation"
                        description="Are you sure to delete this Student ?"
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
            <h2 className='text-4xl font-bold ml-6 text-blue-300'>Students ({data ? data.length : 0})</h2>
            {/* filters */}
            <div className='flex p-2 m-4 float-right'>
                <Search placeholder="Search" style={{ width: 200 }} />
                <Button className='ml-2' icon={<PlusOutlined />} size='middle' onClick={() => { setIsEditing(false); showModal() }}>Add a new Student</Button>
            </div>
            {/* data grid */}
            <Table bordered className='ml-4 mr-4' rowKey={'id'} columns={columns} dataSource={data ? data : []} />
            <Modal title={isEditing ? "Update this Student" : "Create New Student"} open={isModalOpen} centered onOk={handleOk} onCancel={handleCancel} footer={false}>
                <Form
                    name="student"
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
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Pseudonym"
                        name="pseudonym"
                        rules={[{ required: true, message: 'Please type your pseudonym!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please type your name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please type your Email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Age"
                        name="age"
                        rules={[{ required: true, message: 'Please input your Age!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Gender"
                        name="gender"
                        rules={[{ required: true, message: 'Please select your gender!' }]}
                    >
                        <Select>
                            <option value={'male'}>Male</option>
                            <option value={'female'}>Female</option>
                        </Select>
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Grade Level"
                        name="grade_level"
                        rules={[{ required: true, message: 'Please type your grade!' }]}
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

export default Students;