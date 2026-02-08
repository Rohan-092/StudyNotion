import React from 'react';
import ChangeProfilePicture from "./ChangeProfilePicture"
import UpdatePassword from "./UpdatePassword"
import DeleteAccount from "./DeleteAccount"
import EditInformation from './EditInformation';

const Index = () => {
    return (
        <div>
            <h1 className='mb-14 text-3xl font-medium text-richblack-5'>
                Edit Profile
            </h1>

            {/* section1 */}
            <ChangeProfilePicture/>
            
            {/* section2 */}
            <EditInformation/>

            {/* section3 */}
            <UpdatePassword/>

            {/* section4 */}
            <DeleteAccount/>

        </div>
    )
}

export default Index;
