import {MenuDataItem} from "@ant-design/pro-layout";
import {CrownOutlined} from "@ant-design/icons";
import ACCESS_ENUM from "@/access/accessEnum";
// 导出
export const menus = [
    {
        path: "/",
        name: "主页"
    },
    {
        path: "/questions",
        name: "题目"
    },
    {
        path: "/banks",
        name: "题库",
    },
    {
        path: "/admin",
        name: "管理",
        icon: <CrownOutlined/>,
        access: ACCESS_ENUM.ADMIN,
        children: [
            {
                path: "/admin/user",
                name: "用户管理",
                access: ACCESS_ENUM.ADMIN,
            },
        ],
    }
] as MenuDataItem[];

// 根据全部路由查找对应菜单
export const findAllMenuItemByPath = (path: string): MenuDataItem | null => {
    return findMenuItemByPath(menus,path);
}
// 根据路径查找菜单
export const findMenuItemByPath = (menus: MenuDataItem[], path: string): MenuDataItem | null => {
    for (const menu of menus) {
        if (menu.path === path) {
            return menu;
        }
        // 递归查找子路由
        if (menu.children) {
            const matchedMenuItem = findMenuItemByPath(menu.children, path);
            if (matchedMenuItem) {
                return matchedMenuItem;
            }
        }
    }
    return null;
}

