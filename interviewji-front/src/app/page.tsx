import styles from "./page.module.css";
import {listQuestionBankByPageUsingPost} from "@/api/questionBankController";
export default function Home() {
  listQuestionBankByPageUsingPost({}).then(res =>{
      console.log(res);
  })
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
        </p>
      </div>

    </main>
  );
}
