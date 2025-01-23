/* eslint-disable react/prop-types */
import './style.css';

const ProfileImage = ({ image, size = '130px' }) => {
	return (
		<div className="profile-image-container">
			{image ? (
				<img
					src={image}
					alt="Profile"
					className="profile-image"
					style={{ width: size, height: size }}
				/>
			) : (
				<img
					src={'src/images/default.jpg'}
					alt="Profile"
					className="profile-image"
					style={{ width: size, height: size }}
				/>
			)}
		</div>
	);
};

export default ProfileImage;
