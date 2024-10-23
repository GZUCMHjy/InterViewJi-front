"use client"
import {GithubFilled, LogoutOutlined, SearchOutlined,} from '@ant-design/icons';
import {ProLayout,} from '@ant-design/pro-components';
import {Dropdown, Input,} from 'antd';
import React from 'react';
import Image from "next/image"
import {usePathname} from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import './index.css'
import {menus} from "../../../config/menu";
// 搜索条
const SearchInput = () => {
    return (
        <div
            key="SearchOutlined"
            aria-hidden
            style={{
                display: 'flex',
                alignItems: 'center',
                marginInlineEnd: 24,
            }}
            onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <Input
                style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                }}
                prefix={
                    <SearchOutlined/>
                }
                placeholder="搜索题目"
                variant="borderless"
            />
        </div>
    );
};

interface Props{
    children?: React.ReactNode;
}
export default function BasicLayout({children} : Props)  {
    const pathname = usePathname();
    return (
        <div
            id="basicLayout"
            style={{
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <ProLayout
                title="面试基刷题平台"
                logo={
                    <Image src="/assert/id.jpg" height={100} width={50} alt="louis"/>
                }
                layout="top"
                location={{
                    pathname,
                }}
                avatarProps={{
                    src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                    size: 'small',
                    title: 'louis',
                    render: (props, dom) => {
                        return (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: 'logout',
                                            icon: <LogoutOutlined />,
                                            label: '退出登录',
                                        },
                                    ],
                                }}
                            >
                                {dom}
                            </Dropdown>
                        );
                    },
                }}
                actionsRender={(props) => {
                    if (props.isMobile) return [];
                    return [
                        <SearchInput key="search" />,
                        <a
                             key="github"
                             href="https://github.com/GZUCMHjy"
                             target="_blank">
                            <GithubFilled key="GithubFilled" />
                        </a>
                    ];
                }}
                headerTitleRender={(logo, title, _) => {
                    const defaultDom = (
                        <a>
                            {logo}
                            {title}
                        </a>
                    );
                    if (document.body.clientWidth < 1400) {
                        return defaultDom;
                    }
                    if (_.isMobile) return defaultDom;
                    return (
                        <>
                            {defaultDom}
                        </>
                    );
                }}
                // 底部栏
                // menuFooterRender => 改成 footerRender
                footerRender={() => {
                    return <GlobalFooter/>
                }}
                onMenuHeaderClick={(e) => console.log(e)}
                // 菜单数据钩子,定义有哪些菜单
                menuDataRender={() => {
                    return menus;
                }}
                // 定义子菜单项如何渲染
                menuItemRender={(item, dom) => (
                    <Link
                        href={item.path || "/"}
                        target={item.target}
                    >
                        {dom}
                    </Link>
                )}
            >
                {children}
            </ProLayout>
        </div>
    );
};
