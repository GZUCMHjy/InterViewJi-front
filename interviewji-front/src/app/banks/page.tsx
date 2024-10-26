"use server"
import './index.css'
import Title from "antd/es/typography/Title";
import {Flex} from "antd";
import {listQuestionBankVoByPageUsingPost} from "@/api/questionBankController";
import QuestionBankList from "@/components/QuestionBankList";

/**
 * 题库列表页面
 * @constructor
 */
export default async function BankPage() {

    let questionBankList = [];
    let questionList = [];
    // 题库全量获取
    const pageSize = 200;
    try {
        const questionBankRes = await listQuestionBankVoByPageUsingPost({
            pageSize: pageSize,
            sortField: 'createTime',
            sortOrder: 'descend',
        })
        questionBankList = questionBankRes.data.records ?? [];
    } catch (e) {
        console.error('获取题库列表失败，' + e.message);
    }

    return <div id="bankPage" className="max-width-content">
        <Title level={3}>
            题库大全
        </Title>
        <QuestionBankList questionBankList={questionBankList} />
    </div>
}
