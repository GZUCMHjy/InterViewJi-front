"use server"
import './index.css'
import Title from "antd/es/typography/Title";
import QuestionBankList from "@/components/QuestionBankList";
import {listQuestionVoByPageUsingPost} from "@/api/questionController";
import QuestionTable from "@/components/QuestionTable";

/**
 * 题目列表页面
 * @constructor
 */
export default async function QuestionPage({searchParams}) {
    // 获取 url 的查询参数
    const {q: searchText} = searchParams;
    // 题目列表和总数
    let questionList = [];
    let total = 0;
    // 题库全量获取
    const pageSize = 12;
    try {
        const res = await listQuestionVoByPageUsingPost({
            title: searchText,
            pageSize: pageSize,
            sortField: 'createTime',
            sortOrder: 'descend',
        })
        questionList = res.data.records ?? [];
        total = res.data.total ?? 0;
    } catch (e) {
        console.error('获取题目列表失败，' + e.message);
    }

    return <div id="questionPage" className="max-width-content">
        <Title level={3}>
            题目大全
        </Title>
        <QuestionTable defaultQuestionList={questionList} defaultTotal={total}
            defaultSearchParams={{title: searchText}}
        />
    </div>
}
