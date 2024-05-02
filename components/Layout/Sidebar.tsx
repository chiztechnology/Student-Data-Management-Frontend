'use client';
import React from 'react';
import { AppstoreOutlined, FormOutlined, InboxOutlined, LockOutlined, MailOutlined, PaperClipOutlined, SecurityScanOutlined, SendOutlined, SettingOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import Image from 'next/image';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'students',
    label: 'Students',
    icon: <UserOutlined />,
  },
  {
    key: 'exams',
    label: 'Oral Exams',
    icon: <PaperClipOutlined />,
  },
  {
    key: 'attendance',
    label: 'Attendance record',
    icon: <SecurityScanOutlined />,
  },
  {
    key: 'survey',
    label: 'Survey',
    icon: <FormOutlined />,
  },
  {
    key: 'test',
    label: 'Yenza tests',
    icon: <PaperClipOutlined />,
  },
  {
    key: 'grade',
    label: 'Grades',
    icon: <UserSwitchOutlined />,
  },
  {
    key: 'tallylform',
    label: 'Tally forms',
    icon: <FormOutlined />,
  },
  // {
  //   key: 'sub2',
  //   label: 'Navigation Two',
  //   icon: <AppstoreOutlined />,
  //   children: [
  //     { key: '5', label: 'Option 5' },
  //     { key: '6', label: 'Option 6' },
  //     {
  //       key: 'sub3',
  //       label: 'Submenu',
  //       children: [
  //         { key: '7', label: 'Option 7' },
  //         { key: '8', label: 'Option 8' },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   type: 'divider',
  // },
  // {
  //   key: 'sub4',
  //   label: 'Navigation Three',
  //   icon: <SettingOutlined />,
  //   children: [
  //     { key: '9', label: 'Option 9' },
  //     { key: '10', label: 'Option 10' },
  //     { key: '11', label: 'Option 11' },
  //     { key: '12', label: 'Option 12' },
  //   ],
  // },
  // {
  //   key: 'grp',
  //   label: 'Group',
  //   type: 'group',
  //   children: [
  //     { key: '13', label: 'Option 13' },
  //     { key: '14', label: 'Option 14' },
  //   ],
  // },
];

const Sidebar: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e.key);
  };

  return (
    <div className='flex flex-col h-full bg-green-100'>
      <div className='flex justify-center items-center mb-4 mt-4'>
        <Image src={'/images/directed-logo.png'} width={90} height={75} alt='DirectED logo' />
      </div>
      <Menu
        onClick={onClick}
        className='bg-green-100'
        style={{ width: 256, marginTop:20, height:'100%' }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
      <div className='bg-[#3a5341] rounded-xl m-4 pb-4 flex flex-col justify-center items-center'>
                <h2 className='font-bold text-white'>Settings</h2>
                <Button className='mt-1' type="dashed" icon={<InboxOutlined />} size='middle'>Import CSV File</Button>
                <Button className='mt-1' type="default" icon={<SendOutlined />} size='middle'>Export data to CSV</Button>
      </div>
    </div>
  );
};

export default Sidebar;