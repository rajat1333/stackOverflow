import React, {Component} from "react";
import {Routes, Route} from "react-router-dom";
import Login from "./Login/Login";
import Navbar from "./Navbar/Navbar";
import QuestionsOverview from "../components/QuestionsOverview/QuestionsOverview.js";
import TagOverview from "../components/Tags/TagOverview.js";
import QuestionPosting from "../components/QuestionPosting/QuestionPosting.js";
import AddTag from "./Admin/AddTags";
import ApprovalQuestions from "./Admin/ApprovalQuestions/ApprovalQuestions";
import QuestionsReview from "./Admin/ApprovalQuestions/QuestionsReview";

class Main extends Component {
    render() {
        return (
            <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
                   <Navbar/>
                <Routes>
                    {/* <Route exact path="/" element={<Navbar/>}/> */}
                    <Route exact path="/login" element={<Login/>}/>
                    <Route path="/questions/:questionID" element={<QuestionsOverview/>}/>
                    <Route path="/questions" element={<QuestionsOverview/>}/>
                    <Route path="/questions/ask" element={<QuestionPosting/>}/>
                    <Route path="/tags" element={<TagOverview/>}/>
                    <Route path="/admin/tags/add" element={<AddTag/>}/>
                    <Route path="/admin/questions/approval" element={<ApprovalQuestions/>}/>
                    <Route path="/admin/questions/approval/:questionID" element={<QuestionsReview/>}/>
                </Routes>
            </div>
        );
    }
}

export default Main;