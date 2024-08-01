import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";

//마이페이지
import MyPage from "../pages/MyPage";

//게임
import Game from "../pages/Game";

//유저
import User from "../pages/User";
import SignUpForm from "../components/user/SignUpForm";

//지갑
import Wallet from "../pages/Wallet";
import TransactionList from "../components/wallet/TransactionList";
import Send from "../components/wallet/Send";
import CreatePayment from "../components/wallet/CreatePayment";
import SendForm from "../components/wallet/SendForm";

//홈
import Home from "../pages/Home";
import HomeMainContainer from "../components/home/HomeMainContainer";
import HomeMain from "../components/home/HomeMain";
import RegistForm from "../components/home/RegistForm";
import JoinForm from "../components/home/JoinForm";

//미팅
import MeetingContainer from "../components/meeting/MeetingContainer";
import Meetings from "../components/meeting/Meetings";
import MeetingDetail from "../components/meeting/MeetingDetail";
import MeetingDetailContainer from "../components/meeting/MeetingDetailContainer";

//일정
import ScheduleRegist from "../components/schedule/ScheduleRegist";
import ScheduleDetail from "../components/schedule/ScheduleDetail";


//영수증
import Receipt from "../pages/Receipt";
import ReceiptListContainer from "../components/receipt/receiptList/ReceiptListContainer";
import ReceiptFormContainer from "../components/receipt/receiptForm/ReceiptFormContainer";
import ReceiptDetail from "../components/receipt/receiptDetail/ReceiptDetail";
import ProfileUpdate from "../components/mypage/ProfileUpdate";
import Terms from "../components/mypage/Terms";

import PrivateRoute from "./PrivateRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="landing" element={<Landing />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/login" element={<User />} />
      
      {/* 보호된 라우트 */}
      <Route path="/" element={<PrivateRoute component={Home} />}>
        <Route path="" element={<HomeMainContainer />}>
          <Route index element={<HomeMain />} />
          <Route path="regist_form" element={<RegistForm />} />
          <Route path="join_form" element={<JoinForm />} />
        </Route>
        <Route path="meeting" element={<MeetingContainer />}>
          <Route index element={<Meetings />} />
          <Route path=":id" element={<MeetingDetailContainer />}>
            <Route index element={<MeetingDetail />}></Route>
            <Route path="schedule-regist" element={<ScheduleRegist />}></Route>
            <Route path="schedule/:id" element={<ScheduleDetail />}/>
          </Route>
        </Route>
      </Route>

      <Route path="/wallet" element={<PrivateRoute component={Wallet} />} />
      <Route path="/wallet/create_payment" element={<PrivateRoute component={CreatePayment} />} />
      <Route path="/wallet/transaction_list" element={<PrivateRoute component={TransactionList} />} />
      <Route path="/wallet/send" element={<PrivateRoute component={Send} />} />
      <Route path="/wallet/sendform" element={<PrivateRoute component={SendForm} />} />

      <Route path="/mypage" element={<PrivateRoute component={MyPage} />} />
      <Route path="/mypage/profile_update" element={<PrivateRoute component={ProfileUpdate} />} />
      <Route path="/mypage/terms" element={<PrivateRoute component={Terms} />} />

      <Route path="/receipt" element={<Receipt component={Receipt} />}>
        <Route index element={<ReceiptListContainer />} />
        <Route path=":id" element={<ReceiptDetail />} />
        <Route path="regist-form" element={<ReceiptFormContainer />} />
      </Route>

      <Route path="/game" element={<Game component={Game} />} />
    </Routes>
  );
}

export default AppRoutes;
