import React, { useState } from "react";
import "./ReceiptForm.css";
import PaperReceipt from "../../../assets/receipt/paperReceipt.png";
import MobileReceipt from "../../../assets/receipt/mobileReceipt.png";
import Button from "../../common/Button";
import Camera from "../../../assets/receipt/camera.png";
import ActiveCamera from "../../../assets/receipt/activeCamera.png";
import Picture from "../../../assets/receipt/picture.png";
import ActivePicture from "../../../assets/receipt/activePicture.png";
import ConnectReceiptSchedule from "./ConnectReceiptScheduleModal";
import Close from "../../../assets/icons/common/close.png";

function RecognizeComponent({ setActiveTab }) {
  // 영수증 타입 선택 (종이 or 모바일 내역)
  const [activeType, setActiveType] = useState("paper");

  // 인식 결과
  const [recognizedResult, setRecognizedResult] = useState(null);

  // 선택된 이미지 타입
  const [selectedImageType, setSelectedImageType] = useState(null);

  // 인식 결과 수정 상태
  const [isEditing, setIsEditing] = useState(false);

  // 품목리스트
  const [editedItems, setEditedItems] = useState([]);

  // 일정 연결 모달
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 연결된 북마크 정보
  const [bookmark, setBookmark] = useState({ id: -1, name: "" });

  const handleReceiptType = (type) => {
    // 인식 결과 모두 reset
    setSelectedImageType(null);
    setRecognizedResult(null);
    setIsEditing(false);

    // active type 변경
    if (type === "paper") {
      setActiveType("paper");
    } else {
      setActiveType("mobile");
    }
    setRecognizedResult(null);
  };

  const handleCameraButton = () => {
    console.log("camera 버튼 클릭");
    setRecognizedResult(tempRecognizedItems);
    setSelectedImageType("camera");
    setEditedItems(tempRecognizedItems.items);
  };

  const handleImageButton = () => {
    console.log("image 버튼 클릭");
    setRecognizedResult(tempRecognizedItems);
    setSelectedImageType("image");
    setEditedItems(tempRecognizedItems.items);
  };

  const handleEditButton = () => {
    setIsEditing(true);
  };

  const handleSaveButton = () => {
    const updatedResult = { ...recognizedResult, items: editedItems };
    setRecognizedResult(updatedResult);
    setIsEditing(false);
  };

  const handleChange = (index, field, value) => {
    const updatedItems = [...editedItems];
    if (field === "count" || field === "unitPrice") {
      updatedItems[index][field] = Number(value);
    } else {
      updatedItems[index][field] = value;
    }
    setEditedItems(updatedItems);
  };

  const handleConnectSchedule = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = (selectedBookmark) => {
    setBookmark(selectedBookmark);
    setIsModalOpen(false);
  };

  const handleDisconnectPlace = () => {
    setBookmark({ id: -1, name: "" });
  };

  const handleNextTab = () => {
    if (recognizedResult !== null) {
      console.log(recognizedResult.items);
      setActiveTab(
        "calculate",
        recognizedResult.items,
        recognizedResult.businessName,
        recognizedResult.paymentDate,
        bookmark.id
      );
    }
  };

  const tempRecognizedItems = {
    businessName: "How Cafe",
    paymentDate: "2024.07.31",
    items: [
      {
        name: "3루 입장권",
        count: 1,
        unitPrice: 15000,
      },
      {
        name: "1루 입장권",
        count: 2,
        unitPrice: 26000,
      },
      {
        name: "외야 지정석",
        count: 3,
        unitPrice: 30000,
      },
    ],
  };

  return (
    <div className="recognize-component">
      <div className="receipt-type">
        <button
          className={`type-button ${activeType === "paper" ? "active" : ""}`}
          onClick={() => handleReceiptType("paper")}
        >
          종이 영수증
        </button>
        <button
          className={`type-button ${activeType === "mobile" ? "active" : ""}`}
          onClick={() => handleReceiptType("mobile")}
        >
          모바일 결제내역
        </button>
      </div>
      {recognizedResult === null && (
        <div className="reciept-type-img-container">
          <div
            className={`receipt-type-img ${
              activeType === "paper" ? "active" : "inactive"
            }`}
            onClick={() => {
              setActiveType("paper");
            }}
          >
            <img src={PaperReceipt} alt="paper" />
          </div>
          <div
            className={`receipt-type-img ${
              activeType === "mobile" ? "active" : "inactive"
            }`}
            onClick={() => {
              setActiveType("mobile");
            }}
          >
            <img src={MobileReceipt} alt="mobile" />
          </div>
        </div>
      )}
      <div className="recognition-section">
        <div className="recognize-options">
          {recognizedResult === null && (
            <div className="recognize-badge">영수증을 인식해보세요!</div>
          )}
          {recognizedResult !== null && (
            <>
              <div className="recognize-result-title">인식결과</div>
              {!isEditing && (
                <button className="edit-result" onClick={handleEditButton}>
                  편집
                </button>
              )}
              {isEditing && (
                <button className="save-result" onClick={handleSaveButton}>
                  저장
                </button>
              )}
            </>
          )}
          <div className="recognize-image-buttons">
            {selectedImageType === "camera" ? (
              <img src={ActiveCamera} alt="active-camera" />
            ) : (
              <img src={Camera} alt="camera" onClick={handleCameraButton} />
            )}
            {selectedImageType === "image" ? (
              <img src={ActivePicture} alt="active-camera" />
            ) : (
              <img src={Picture} alt="image" onClick={handleImageButton} />
            )}
          </div>
        </div>
      </div>
      {recognizedResult === null && (
        <div className="recognized-content no-content">
          <p>인식된 내용이 없어요</p>
          <p>영수증을 인식해 정산을 시작해보세요!</p>
        </div>
      )}
      {recognizedResult !== null && isEditing ? (
        <div className="recognized-edit-info">
          <input
            type="text"
            className="recognized-store-name edit"
            value={recognizedResult.businessName}
            onChange={(e) =>
              setRecognizedResult({
                ...recognizedResult,
                businessName: e.target.value,
              })
            }
          />
          <input
            type="text"
            className="recognized-payment-date edit"
            value={recognizedResult.paymentDate}
            onChange={(e) =>
              setRecognizedResult({
                ...recognizedResult,
                paymentDate: e.target.value,
              })
            }
          />
        </div>
      ) : (
        recognizedResult !== null && (
          <>
            <div className="recognized-store-name">
              <p>{recognizedResult.businessName}</p>
            </div>
            <div className="recognized-payment-date">
              <p>{recognizedResult.paymentDate}</p>
            </div>
          </>
        )
      )}
      {recognizedResult !== null && (
        <div className="recognized-content">
          <table>
            <thead>
              <tr>
                <th>품목</th>
                <th>수량</th>
                <th>금액</th>
              </tr>
            </thead>
            <tbody>
              {editedItems.map((item, index) => (
                <tr key={index}>
                  {isEditing ? (
                    <>
                      <td>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) =>
                            handleChange(index, "name", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.count}
                          onChange={(e) =>
                            handleChange(index, "count", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) =>
                            handleChange(index, "unitPrice", e.target.value)
                          }
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{item.name}</td>
                      <td>{item.count}개</td>
                      <td>{item.unitPrice.toLocaleString()}원</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <hr className="recognized-content-line" />
          <div className="total">
            <p>총액</p>
            <p>
              {editedItems
                .reduce((total, item) => total + item.unitPrice * item.count, 0)
                .toLocaleString()}
              원
            </p>
          </div>
        </div>
      )}
      {recognizedResult !== null && bookmark.id === -1 && (
        <button className="connect-schedule" onClick={handleConnectSchedule}>
          장소연결
        </button>
      )}
      {recognizedResult !== null && bookmark.id !== -1 && (
        <div className="connected-place-info">
          <div>연결된 장소</div>
          <div className="connected-place-name">
            {bookmark.name}
            <img
              src={Close}
              alt="disconnect"
              className="disconnect-button"
              onClick={handleDisconnectPlace}
            />
          </div>
        </div>
      )}
      <Button
        type={recognizedResult === null ? "gray" : "purple"}
        onClick={handleNextTab}
      >
        다음
      </Button>
      {isModalOpen && (
        <ConnectReceiptSchedule
          onClose={closeModal}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}

export default RecognizeComponent;
