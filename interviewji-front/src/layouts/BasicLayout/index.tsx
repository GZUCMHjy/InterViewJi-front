"use client"
import {GithubFilled, LogoutOutlined, SearchOutlined,} from '@ant-design/icons';
import {ProLayout,} from '@ant-design/pro-components';
import {Dropdown, Input, message,} from 'antd';
import React, {useState} from 'react';
import Image from "next/image"
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import './index.css'
import {menus} from "../../../config/menu";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/stores";
import getAccessibleMenus from "@/access/menuAccess";
import {userLogoutUsingPost} from "@/api/userController";
import {setLoginUser} from "@/stores/loginUser";
import DEFAULT_USER from "@/constants/user";
import SearchInput from "@/layouts/BasicLayout/components/SearcheInput";
interface Props {
    children?: React.ReactNode;
}

export default function BasicLayout({children}: Props) {
    const pathname = usePathname();
    // 钩子 用于获取全局用户信息
    const loginUser = useSelector((state: RootState) => state.loginUser);
    const [text, setText] = useState<string>('');
    const router = useRouter();
    const dispatch = useDispatch();
    const doUserLogout = async () => {
        const res = await userLogoutUsingPost();
        try {
            if (res.data) {
                message.success("已退出登录");
                // 保存用户状态
                dispatch(setLoginUser(DEFAULT_USER));
                // 重定向
                router.push("/user/login");
            }
        } catch (e) {
            message.error("退出失败" + e.message)
        }
    }

    // return 用于返回 html 代码
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
                    src: loginUser.userAvatar || "/assert/id.jpg",
                    size: 'small',
                    title: loginUser.userName || "louis",
                    render: (props, dom) => {
                        if (!loginUser.id) {
                            // 如果未登录 直接返回空
                            return <div onClick={() =>{
                                router.push("/user/login");
                            }}>{dom}</div>;
                        }
                        return (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: 'logout',
                                            icon: <LogoutOutlined/>,
                                            label: '退出登录',
                                        },
                                    ],
                                    onClick: async (event: { key: React.Key }) => {
                                        const {key} = event;
                                        if (key === 'logout') {
                                            doUserLogout();
                                        }
                                    }
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
                        <SearchInput key="search"/>,
                        <a
                            key="github"
                            href="https://github.com/GZUCMHjy"
                            target="_blank">
                            <GithubFilled key="GithubFilled"/>
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
                    // if (document.body.clientWidth < 1400) {
                    //     return defaultDom;
                    // }
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
                    return getAccessibleMenus(loginUser, menus);
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
                {/*<MdEditor value={text} onChange={setText} />*/}
                {/*<MdViewer value={text} />*/}
                {children}
            </ProLayout>
        </div>
    );
};
