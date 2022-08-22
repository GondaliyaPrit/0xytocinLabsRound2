import "./App.css";
import { ethers } from "ethers";
import contrctmint from "./mint.json";
import { useState } from "react";

import LoadingSpinner from "./componets/LoadingSpinner";

function App() {
  const [publicdata, setPublicdata] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showloading, setShowLoading] = useState(false);
  const [hidetxt, setHidetxt] = useState("");
  const [contact, setContact] = useState("");

  //UseState For Update DataValue
  const [WhitelistUnoCap, SetWhitelistUnoCap] = useState(0);
  const [WhitelistDosCap, SetWhitelistDosCap] = useState(0);
  const [OwnerMintReserved, SetOwnerMintReserved] = useState(0);
  const [IndividualDosCap, SetIndividualDosCap] = useState(0);
  const [IndividualUnoCap, SetIndividualUnoCap] = useState(0);
  const [WhitelistUnoStartTime, SetWhitelistUnoStartTime] = useState(0);
  const [WhitelistUnoEndTime, SetWhitelistUnoEndTime] = useState(0);
  const [WhitelistDosStartTime, SetWhitelistDosStartTime] = useState(0);
  const [WhitelistDosEndTime, SetWhitelistDosEndTime] = useState(0);
  const [WhitelistUnoMintPrice, SetWhitelistUnoMintPrice] = useState(0);
  const [WhitelistDosMintPrice, SetWhitelistDosMintPrice] = useState(0);
  const [PublicMintPrice, SetPublicMintPrice] = useState(0);

  //Get Contract data
  const Contractdata = async () => {
    setIsLoading(true);
    setShowLoading(true);
    setHidetxt("");
    const Address = "0xDDe0600C8962A626F0D69C0f4a0cC8Ed42a43D47";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const singer = provider.getSigner();
    const contrct = new ethers.Contract(Address, contrctmint, singer);
    setContact(contrct);
    console.log(contrct);

    const maxSupply = await contrct.maxSupply();
    const whitelistUnoCap = await contrct.whitelistUnoCap();
    const whitelistDosCap = await contrct.whitelistDosCap();
    const ownerMintReserved = await contrct.ownerMintReserved();
    const individualUnoCap = await contrct.individualUnoCap();
    const individualDosCap = await contrct.individualDosCap();
    const whitelistUnoStartTime = await contrct.whitelistUnoStartTime();
    const whitelistDosStartTime = await contrct.whitelistDosStartTime();
    const whitelistUnoEndTime = await contrct.whitelistUnoEndTime();
    const whitelistDosEndTime = await contrct.whitelistDosEndTime();
    const whitelistUnoMintPrice = await contrct.whitelistUnoMintPrice();
    const whitelistDosMintPrice = await contrct.whitelistDosMintPrice();
    const publicMintPrice = await contrct.publicMintPrice();

    console.log("" + maxSupply);

    // Contrct Data Object Key and value
    const contrctdataobj = {
      maxSupply: maxSupply.toString(),
      whitelistUnoCap: whitelistUnoCap.toString(),
      whitelistDosCap: whitelistDosCap.toString(),
      ownerMintReserved: ownerMintReserved.toString(),
      individualUnoCap: individualUnoCap.toString(),
      individualDosCap: individualDosCap.toString(),
      whitelistUnoStartTime: whitelistUnoStartTime.toString(),
      whitelistDosStartTime: whitelistDosStartTime.toString(),
      whitelistUnoEndTime: whitelistUnoEndTime.toString(),
      whitelistDosEndTime: whitelistDosEndTime.toString(),
      whitelistUnoMintPrice: ethers.utils.formatEther(whitelistUnoMintPrice),
      whitelistDosMintPrice: ethers.utils.formatEther(whitelistDosMintPrice),
      publicMintPrice: ethers.utils.formatEther(publicMintPrice),
    };

    setPublicdata(contrctdataobj);
    setIsLoading(false);
  };

  return (
    <>
      <div className="btn-div">
        <button className="contrcatdata-btn" onClick={Contractdata}>
          Get Contract Data
        </button>
      </div>
      {isLoading ? (
        showloading ? (
          <LoadingSpinner />
        ) : (
          <div></div>
        )
      ) : (
        <div>
          <div className="card-div">
            <div className="namediv">
              <h2>MaxSupply</h2>
            </div>
            <h2 className="namediv">{publicdata.maxSupply}</h2>
          </div>

          <div className="card-div">
            <div className="namediv">
              <h2>WhitelistUnoCap</h2>
            </div>
            <h2 className="namediv">{publicdata.whitelistUnoCap}</h2>
            {hidetxt === "whitelistUnoCap" ? (
              <input
                type="text"
                className="namediv"
                onChange={(event) => {
                  SetWhitelistUnoCap(Number(event.target.value));
                }}
              ></input>
            ) : null}

            <button
              className="contrcatdata-btn"
              onClick={async (e) => {
                if (e.target.innerText === "Edit") {
                  setHidetxt("whitelistUnoCap");
                } else {
                  const val = await contact.setWhiteListUnoCap(WhitelistUnoCap);
                  setIsLoading(true);
                  setShowLoading(true);
                  <LoadingSpinner />;
                  await val.wait();
                  Contractdata();
                }
              }}
            >
              {hidetxt === "whitelistUnoCap" ? "Update" : "Edit"}
            </button>
          </div>

          <div className="card-div">
            <div className="namediv">
              <h2>WhitelistDosCap</h2>
            </div>
            <h2 className="namediv">{publicdata.whitelistDosCap}</h2>
            {hidetxt === "whitelistDosCap" ? (
              <input
                type="text"
                className="namediv"
                onChange={(event) => {
                  SetWhitelistDosCap(event.target.value);
                }}
              ></input>
            ) : null}

            <button
              className="contrcatdata-btn"
              onClick={async (e) => {
                if (e.target.innerText === "Edit") {
                  setHidetxt("whitelistDosCap");
                } else {
                  const val = await contact.setWhiteListDosCap(WhitelistDosCap);
                  setIsLoading(true);
                  setShowLoading(true);
                  <LoadingSpinner />;
                  await val.wait();
                  Contractdata();
                }
              }}
            >
              {hidetxt === "whitelistDosCap" ? "Update" : "Edit"}
            </button>
          </div>

          <div className="card-div">
            <div className="namediv">
              <h2>OwnerMintReserved</h2>
            </div>
            <h2 className="namediv">{publicdata.ownerMintReserved}</h2>
            {hidetxt === "ownerMintReserved" ? (
              <input
                type="text"
                className="namediv"
                onChange={(event) => {
                  SetOwnerMintReserved(event.target.value);
                }}
              ></input>
            ) : null}
            <button
              className="contrcatdata-btn"
              onClick={async (e) => {
                if (e.target.innerText === "Edit") {
                  setHidetxt("ownerMintReserved");
                } else {
                  const val = await contact.changeOwnerMint(OwnerMintReserved);
                  setIsLoading(true);
                  setShowLoading(true);
                  <LoadingSpinner />;
                  await val.wait();
                  Contractdata();
                }
              }}
            >
              {hidetxt === "ownerMintReserved" ? "Update" : "Edit"}
            </button>
          </div>

          <div className="card-div">
            <div className="namediv">
              <h2>IndividualDosCap</h2>
            </div>
            <h2 className="namediv">{publicdata.individualDosCap}</h2>
            {hidetxt === "individualDosCap" ? (
              <input
                type="text"
                className="namediv"
                onChange={(event) => {
                  SetIndividualDosCap(event.target.value);
                }}
              ></input>
            ) : null}
            <button
              className="contrcatdata-btn"
              onClick={async (e) => {
                if (e.target.innerText === "Edit") {
                  setHidetxt("individualDosCap");
                } else {
                  const val = await contact.setWhiteListDosIndividualCap(
                    IndividualDosCap
                  );
                  setIsLoading(true);
                  setShowLoading(true);
                  <LoadingSpinner />;
                  await val.wait();
                  Contractdata();
                }
              }}
            >
              {hidetxt === "individualDosCap" ? "Update" : "Edit"}
            </button>
          </div>

          <div className="card-div">
            <div className="namediv">
              <h2>IndividualUnoCap</h2>
            </div>
            <h2 className="namediv">{publicdata.individualUnoCap}</h2>
            {hidetxt === "individualUnoCap" ? (
              <input
                type="text"
                className="namediv"
                onChange={(event) => {
                  SetIndividualUnoCap(event.target.value);
                }}
              ></input>
            ) : null}
            <button
              className="contrcatdata-btn"
              onClick={async (e) => {
                if (e.target.innerText === "Edit") {
                  setHidetxt("individualUnoCap");
                } else {
                  const val = await contact.setWhiteListUnoIndividualCap(
                    IndividualUnoCap
                  );
                  setIsLoading(true);
                  setShowLoading(true);
                  <LoadingSpinner />;
                  await val.wait();
                  Contractdata();
                }
              }}
            >
              {hidetxt === "individualUnoCap" ? "Update" : "Edit"}
            </button>
          </div>

          <div className="card-div">
            <div className="namediv">
              <h2>WhitelistUnoStartTime</h2>
            </div>
            <h2 className="namediv">{publicdata.whitelistUnoStartTime}</h2>
            {hidetxt === "whitelistUnoStartTime" ? (
              <input
                type="text"
                className="namediv"
                onChange={(event) => {
                  SetWhitelistUnoStartTime(event.target.value);
                }}
              ></input>
            ) : null}
            <button
              className="contrcatdata-btn"
              onClick={async (e) => {
                if (e.target.innerText === "Edit") {
                  setHidetxt("whitelistUnoStartTime");
                } else {
                  const val = await contact.setWhitelistUnoStartTime(
                    WhitelistUnoStartTime
                  );
                  setIsLoading(true);
                  setShowLoading(true);
                  <LoadingSpinner />;
                  await val.wait();
                  Contractdata();
                }
              }}
            >
              {hidetxt === "whitelistUnoStartTime" ? "Update" : "Edit"}
            </button>
          </div>

          <div className="card-div">
            <div className="namediv">
              <h2>WhitelistUnoEndTime</h2>
            </div>
            <h2 className="namediv">{publicdata.whitelistUnoEndTime}</h2>
            {hidetxt === "whitelistUnoEndTime" ? (
              <input
                type="text"
                className="namediv"
                onChange={(event) => {
                  SetWhitelistUnoEndTime(event.target.value);
                }}
              ></input>
            ) : null}
            <button
              className="contrcatdata-btn"
              onClick={async (e) => {
                if (e.target.innerText === "Edit") {
                  setHidetxt("whitelistUnoEndTime");
                } else {
                  const val = await contact.setWhitelistUnoEndTime(
                    WhitelistUnoEndTime
                  );
                  setIsLoading(true);
                  setShowLoading(true);
                  <LoadingSpinner />;
                  await val.wait();
                  Contractdata();
                }
              }}
            >
              {hidetxt === "whitelistUnoEndTime" ? "Update" : "Edit"}
            </button>
          </div>

          <div className="card-div">
            <div className="namediv">
              <h2>WhitelistDosStartTime</h2>
            </div>
            <h2 className="namediv">{publicdata.whitelistDosStartTime}</h2>
            {hidetxt === "whitelistDosStartTime" ? (
              <input
                type="text"
                className="namediv"
                onChange={(event) => {
                  SetWhitelistDosStartTime(event.target.value);
                }}
              ></input>
            ) : null}
            <button
              className="contrcatdata-btn"
              onClick={async (e) => {
                if (e.target.innerText === "Edit") {
                  setHidetxt("whitelistDosStartTime");
                } else {
                  const val = await contact.setWhitelistDosStartTime(
                    WhitelistDosStartTime
                  );
                  setIsLoading(true);
                  setShowLoading(true);
                  <LoadingSpinner />;
                  await val.wait();
                  Contractdata();
                }
              }}
            >
              {hidetxt === "whitelistDosStartTime" ? "Update" : "Edit"}
            </button>
          </div>

          <div className="card-div">
            <div className="namediv">
              <h2>WhitelistDosEndTime</h2>
            </div>
            <h2 className="namediv">{publicdata.whitelistDosEndTime}</h2>
            {hidetxt === "whitelistDosEndTime" ? (
              <input
                type="text"
                className="namediv"
                onChange={(event) => {
                  SetWhitelistDosEndTime(event.target.value);
                }}
              ></input>
            ) : null}
            <button
              className="contrcatdata-btn"
              onClick={async (e) => {
                if (e.target.innerText === "Edit") {
                  setHidetxt("whitelistDosEndTime");
                } else {
                  const val = await contact.setWhitelistDosEndTime(
                    WhitelistDosEndTime
                  );
                  setIsLoading(true);
                  setShowLoading(true);
                  <LoadingSpinner />;
                  await val.wait();
                  Contractdata();
                }
              }}
            >
              {hidetxt === "whitelistDosEndTime" ? "Update" : "Edit"}
            </button>
          </div>

          <div className="card-div">
            <div className="namediv">
              <h2>WhitelistUnoMintPrice</h2>
            </div>
            <h2 className="namediv">{publicdata.whitelistUnoMintPrice}</h2>
            {hidetxt === "whitelistUnoMintPrice" ? (
              <input
                type="text"
                className="namediv"
                onChange={(event) => {
                  SetPublicMintPrice(event.target.value);
                }}
              ></input>
            ) : null}
            <button
              className="contrcatdata-btn"
              onClick={async (e) => {
                if (e.target.innerText === "Edit") {
                  setHidetxt("whitelistUnoMintPrice");
                } else {
                  const val = await contact.setWhitelistUnoMintPrice(
                    WhitelistUnoMintPrice
                  );
                  setIsLoading(true);
                  setShowLoading(true);
                  <LoadingSpinner />;
                  await val.wait();
                  Contractdata();
                }
              }}
            >
              {hidetxt === "whitelistUnoMintPrice" ? "Update" : "Edit"}
            </button>
          </div>

          <div className="card-div">
            <div className="namediv">
              <h2>WhitelistDosMintPrice</h2>
            </div>
            <h2 className="namediv">{publicdata.whitelistDosMintPrice}</h2>
            {hidetxt === "whitelistDosMintPrice" ? (
              <input
                type="text"
                className="namediv"
                onChange={(event) => {
                  SetWhitelistDosMintPrice(event.target.value);
                }}
              ></input>
            ) : null}
            <button
              className="contrcatdata-btn"
              onClick={async (e) => {
                if (e.target.innerText === "Edit") {
                  setHidetxt("whitelistDosMintPrice");
                } else {
                  const val = await contact.setWhitelistDosMintPrice(
                    WhitelistDosMintPrice
                  );
                  setIsLoading(true);
                  setShowLoading(true);
                  <LoadingSpinner />;
                  await val.wait();
                  Contractdata();
                }
              }}
            >
              {hidetxt === "whitelistDosMintPrice" ? "Update" : "Edit"}
            </button>
          </div>

          <div className="card-div">
            <div className="namediv">
              <h2>PublicMintPrice</h2>
            </div>
            <h2 className="namediv">{publicdata.publicMintPrice}</h2>
            {hidetxt === "publicMintPrice" ? (
              <input
                type="text"
                className="namediv"
                onChange={(event) => {
                  SetWhitelistUnoMintPrice(event.target.value);
                }}
              ></input>
            ) : null}
            <button
              className="contrcatdata-btn"
              onClick={async (e) => {
                if (e.target.innerText === "Edit") {
                  setHidetxt("publicMintPrice");
                } else {
                  const val = await contact.setPublicMintPrice(PublicMintPrice);
                  setIsLoading(true);
                  setShowLoading(true);
                  <LoadingSpinner />;
                  await val.wait();
                  Contractdata();
                }
              }}
            >
              {hidetxt === "publicMintPrice" ? "Update" : "Edit"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
