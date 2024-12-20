import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, fetchClubData } from "../../redux/slice";
import SideMenu from "./SideMenu";
import MainContent from "./MainContent";
import SearchBar from "./SearchBar";
import DataTable from "./DataTable";
import ClubDirectors from "./ClubDirectors";
import ClubProfile from "./ClubProfile";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import Spinner from "./Spinner";

const Dashboard = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  let hasUser = localStorage.getItem("activeUser")

  const redirect = () => {
    if (hasUser == null || !hasUser) {
      navigate("/");
    }
  };

  useEffect(() => {
    redirect();
  }, [hasUser]);

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchClubData());
  }, [dispatch]);

  let { data, clubData, loadClubData } = useSelector((state) => state.reducer);

  let headers = [
    "Name",
    "Lastname",
    "Email",
    "Club Name",
    "Phone Number",
    "Gender",
    "Effective Date",
    "Role",
    "Status",
    "Amilia",
    "Last Update",
  ];

  data = data.map((row) => {
    const item9 = row[11];
    const before = row.slice(0, 3);
    const after = row.slice(3, 10);
    return [...before, item9, ...after];
  })


  let isBcsf = JSON.parse(localStorage.getItem("isBcsf"));
  // let isManager = localStorage.getItem("isManager");
  // let clubName = localStorage.getItem("clubName");
  // let localUserData = localStorage.getItem()

  const rolePosition = 7;
  const statusPosition = 8;
  const amiliaPosition = 9;

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data || []);
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedClub, setSelectedClub] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedAmilia, setSelectedAmilia] = useState("All");
  const [activeButton, setActiveButton] = useState("clubsProfile");
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [btnId, setBtnId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 13;

  const uniqueRoleValues = [
    // eslint-disable-next-line
    ...new Set(data.map((item) => item[rolePosition])),
  ].filter((el) => el !== "");

  const uniqueClubValues = [
    // eslint-disable-next-line
    ...new Set(data.map((item) => item[3])),
  ].filter((el) => el !== "");

  const uniqueStatusValues = [
    // eslint-disable-next-line
    ...new Set(data.map((item) => item[statusPosition])),
  ].filter((el) => el !== "");

  const uniqueAmiliaValues = [
    // eslint-disable-next-line
    ...new Set(data.map((item) => item[amiliaPosition])),
  ].filter((el) => el !== "");

  const handleRoleChange = (newSelectedRole) => {
    setSelectedRole(newSelectedRole);
  };

  const handleClubChange = (newSelectedClub) => {
    setSelectedClub(newSelectedClub);
  };

  const handleStatusChange = (newSelectedStatus) => {
    setSelectedStatus(newSelectedStatus);
  };

  const handleAmiliaChange = (newSelectedAmilia) => {
    setSelectedAmilia(newSelectedAmilia);
  };

  useEffect(() => {
    let newFilteredData = [...data];

    if (searchQuery) {
      newFilteredData = newFilteredData.filter((row) =>
        row.some(
          (cell) =>
            typeof cell === "string" &&
            cell.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    if (selectedRole && selectedRole !== "All") {
      newFilteredData = newFilteredData.filter(
        (row) => row[rolePosition] === selectedRole
      );
    }

    if (selectedClub && selectedClub !== "All") {
      newFilteredData = newFilteredData.filter(
        (row) => row[3] === selectedClub
      );
    }

    if (selectedStatus && selectedStatus !== "All") {
      newFilteredData = newFilteredData.filter(
        (row) => row[statusPosition] === selectedStatus
      );
    }

    if (selectedAmilia && selectedAmilia !== "All") {
      newFilteredData = newFilteredData.filter(
        (row) => row[amiliaPosition] === selectedAmilia
      );
    }

    setFilteredData(newFilteredData);
  }, [
    // data,
    searchQuery,
    selectedRole,
    selectedClub,
    selectedStatus,
    selectedAmilia,
    rolePosition,
    statusPosition,
    amiliaPosition,
  ]);

  // si sacas esto no aparecen personas en la tab history
  useEffect(() => {
    if (data && data.length > 0 && filteredData.length === 0) {
      setFilteredData(data);
    }
  }, [data, filteredData]);  

  if (loadClubData) {
    return (
      <div>
        <SideMenu
          setActiveButton={setActiveButton}
          activeButton={activeButton}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setShowModal={setShowModal}
          setBtnId={setBtnId}
        />
        <div className="md:pl-[280px] flex h-dvh justify-center m-auto items-center">
          <Spinner />
        </div>
      </div>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <SideMenu
        setActiveButton={setActiveButton}
        activeButton={activeButton}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setShowModal={setShowModal}
        setBtnId={setBtnId}
      />
      <div className="md:pl-[280px]">
        <main className="">
          <div className="px-4 mt-8 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <div id="historicalDiv">
                {activeButton === "historical" && (
                  <>
                    <MainContent
                      originalData={data}
                      handleRoleChange={handleRoleChange}
                      rolePosition={rolePosition}
                      selectedRole={selectedRole}
                      handleClubChange={handleClubChange}
                      selectedClub={selectedClub}
                      setSelectedClub={setSelectedClub}
                      handleStatusChange={handleStatusChange}
                      statusPosition={statusPosition}
                      selectedStatus={selectedStatus}
                      handleAmiliaChange={handleAmiliaChange}
                      amiliaPosition={amiliaPosition}
                      selectedAmilia={selectedAmilia}
                      uniqueRoleValues={uniqueRoleValues}
                      uniqueClubValues={uniqueClubValues}
                      uniqueStatusValues={uniqueStatusValues}
                      uniqueAmiliaValues={uniqueAmiliaValues}
                      setCurrentPage={setCurrentPage}

                    />
                    <SearchBar setSearchQuery={setSearchQuery} />
                  </>
                )}
                <div className="flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-4 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg max-w-screen pb-20">
                        {activeButton === "clubs" ? (
                          <ClubDirectors
                            // isManager={isManager}
                            data={data}
                            isBcsf={isBcsf}
                            uniqueClubValues={uniqueClubValues}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            showModal={showModal}
                            setShowModal={setShowModal}
                            setActiveButton={setActiveButton}
                            btnId={btnId}
                          />
                        ) : activeButton === "clubsProfile" ? (
                          <ClubProfile
                            isBcsf={isBcsf}
                            clubData={clubData}
                            uniqueClubValues={uniqueClubValues}
                          />
                        ) : activeButton === "historical" ? (
                          <DataTable data={currentData} headers={headers} />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                {activeButton === "historical" ? (
                  <Pagination
                    totalItems={filteredData.filter((el) => el[0] != '' && el[1] != '').length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
