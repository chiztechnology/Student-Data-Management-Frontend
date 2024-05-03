'use client';
import React from 'react';
import { AppstoreOutlined, FormOutlined, InboxOutlined, LockOutlined, MailOutlined, PaperClipOutlined, SecurityScanOutlined, SendOutlined, SettingOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
    key: 'tallyform',
    label: 'Tally forms',
    icon: <FormOutlined />,
  },

];



const Sidebar: React.FC = () => {

  const router= useRouter();

  const onClick: MenuProps['onClick'] = (e) => { router.push(`/${e.key}`)  };

  return (
    <div className='flex flex-col h-[100%] bg-green-100'>
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