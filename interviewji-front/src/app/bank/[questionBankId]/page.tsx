"use server"
import './index.css'
import {Avatar, Button, Card, Typography} from "antd";
import {getQuestionBankVoByIdUsingGet} from "@/api/questionBankController";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import QuestionList from "@/components/QuestionList";

/**
 * 题库详情页
 * @constructor
 */
export default async function BankPage({params}) {
    const {questionBankId} = params;
    let bank = undefined;

    try {
        const res = await getQuestionBankVoByIdUsingGet({
            id: questionBankId,
            needQueryQuestionList: true,
            pageSize: 200,
        })
        bank = res.data;
    } catch (e) {
        console.error('获取题库列表失败，' + e.message);
    }
    if (!bank) {
        return <div>获取题库详情失败，请刷新重试</div>
    }
    // 获取第一道题
    let firstQuestionId;
    if(bank.questionPage?.records && bank.questionPage?.records.length > 0) {
        firstQuestionId = bank.questionPage.records[0].id;
    }
    return <div id="bankPage" className="max-width-content">
        <Card>
            <Meta
                avatar={<Avatar src={bank.picture} size={72}/>}
                title={<Title level={3} style={{marginBottom: 0}}>{bank.title}</Title>}
                description={
                <>
                    <Paragraph type="secondary" ellipsis={{rows: 1}} style={{marginBottom: 0}}>
                        {bank.description}
                    </Paragraph>
                    <Button type="primary" shape="round"
                    href={`/bank/${questionBankId}/question/${firstQuestionId}`} target="_blank">
                    开始刷题
                    </Button>
                </>
                }
            />
        </Card>
        <div style={{marginBottom: 16}}></div>
        <QuestionList
            questionBankId={questionBankId}
            questionList={bank.questionPage?.records ?? []} cardTitle={`题目列表（${
            bank.questionPage?.total ?? 0
        }）`}/>
    </div>
}
