import {fetchUsers} from "../store/thunks/fetchUsers.js";
import {addUser} from "../store/thunks/addUser.js";
import Button from './Button';
import Skeleton from './Skeleton';
import useThunk from "../hooks/use-thunk.jsx";
import {useSelector} from "react-redux";
import {useEffect} from "react";

const UsersList = () => {
	const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers)
	const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser)
	const {data} = useSelector((state) => {
		return state.users;
	});

	useEffect(() => {
		doFetchUsers()
	}, [doFetchUsers]);

	const handleUserAdd = () => {
		doCreateUser()
	};

	if (loadingUsersError) {
		return <div>Error fetching data...</div>;
	}

	const renderedUsers = data.map((user) => {
		return (
			<div key={user.id} className="mb-2 border rounded">
				<div className="flex p-2 justify-between items-center cursor-pointer">
					{user.name}
				</div>
			</div>
		);
	});

	return (
		<>
			<div className="flex flex-row justify-between m-3">
				<h1 className="m-2 text-xl">Users</h1>
				{
					isCreatingUser
						? 'Creating User...'
						: <Button onClick={handleUserAdd}>+ Add User</Button>
				}
				{creatingUserError && 'Error creating user'}
			</div>
			{
				isLoadingUsers
					? <Skeleton times={6} className="h-10 w-full"/>
					: renderedUsers
			}
		</>
	);
}

export default UsersList;
