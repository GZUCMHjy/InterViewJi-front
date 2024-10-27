import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import 'github-markdown-css/github-markdown-light.css';
import {useEffect, useState} from "react";
import {addUserSignInUsingPost} from "@/api/userController";
import {message} from "antd";


/**
 * Markdown
 * @param props
 * @constructor
 */
const useAddUserSignInRecord = () => {
    const [loading, setLoading] = useState<boolean>(true);
    // 请求后端获取数据
    const doFetch = async () => {
        setLoading(true);
        try {
            await addUserSignInUsingPost({});
        } catch (e) {
            message.error("获取刷题签到记录失败，" + e.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        doFetch();
    }, []);
    return {loading}
};

export default useAddUserSignInRecord;
