"use client"
import {AntdRegistry} from "@ant-design/nextjs-registry";
import "./globals.css";
import React, {useCallback, useEffect} from "react";
import BasicLayout from "@/layouts/BasicLayout";
import store, {AppDispatch} from "@/stores";
import {Provider, useDispatch} from 'react-redux'
import {init} from "next/dist/server/typescript/utils";
import {getLoginUserUsingGet} from "@/api/userController";
import {setLoginUser} from "@/stores/loginUser";
import AccessLayout from "@/access/AccessLayout";
import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 全局初始化逻辑
 * @param children
 * @constructor
 */
const InitLayout: React.FC<
    Readonly<{
        children: React.ReactNode;
    }>
> = ({children}) => {
    /**
     * 全局初始化函数，有全局单次调用的代码，都可以写到这里
     */
        // 获取触发器
    const dispatch = useDispatch<AppDispatch>();
    const doInitLoginUser = useCallback(async () => {
        const res = await getLoginUserUsingGet();
        if (res.data) {
            // 更新用户信息
        } else {
            setTimeout(() => {
                const testUser = {userName: "测试登录", id: 1, userAvatar: "https://www.code-nav.cn/logo.png",
                userRole: ACCESS_ENUM.ADMIN}
                dispatch(setLoginUser(testUser))
            }, 3000)
        }
    }, []);
    // 只执行一次
    useEffect(() => {
        doInitLoginUser();
    }, []);
    return children;
};
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh">
        <body>
        <AntdRegistry>
            <Provider store={store}>
                <InitLayout>
                    <AccessLayout>
                        <BasicLayout>{children}</BasicLayout>
                    </AccessLayout>
                </InitLayout>
            </Provider>
        </AntdRegistry>
        </body>
        </html>
    );
}
