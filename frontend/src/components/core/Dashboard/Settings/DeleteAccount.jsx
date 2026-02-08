import React from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from "../../../common/ConfirmationModal"
import { deleteProfile } from '../../../../services/operations/SettingsAPI'
// import toast from 'react-hot-toast'
import { useState } from 'react'

const DeleteAccount = () => {
    const { token } = useSelector((state) => state.auth)
    const [confirmationModal, setConfirmationModal] = useState(null);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // async function handleDeleteAccount() {
    //     toast.success("your account deleted in 5 min");
    //     const FourDaysInMs = 4*24*60*60*1000;
    //     setTimeout(()=>{
    //         try {
    //             dispatch(deleteProfile(token, navigate));
    //         } catch(error) {
    //             console.log('ERROR MESSAGE - ', error.message)
    //         }
    //     },FourDaysInMs)
    // }

    return (
    <>
        <div className='my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12'>
            <div className='flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700'>
                <FiTrash2 className='text-3xl text-pink-200' />
            </div>
            <div className='flex flex-col space-y-2'>
                <h2 className='text-lg font-semibold text-richblack-5'>
                    Delete Account
                </h2>
                <div className='w-3/5 text-pink-25'>
                    <p>Would You Like To Delete Account?</p>
                    <p>
                        This account may contain Paid Courses. Deleting your account is 
                        permanent and will remove all the contain associated with it. 
                    </p>
                </div>
                <button
                    type='button'
                    className='w-fit cursor-pointer italic text-pink-300'
                    onClick={() => setConfirmationModal({
                        text1: "Are you sure ?",
                        text2: "Your account will be deleted permanently",
                        btnText1: "Delete",
                        btnText2: "Cancel",
                        btn1Handler: () => dispatch(deleteProfile(token, navigate)),
                        btn2Handler: () => setConfirmationModal(null),
                    })
                    }
                    // onClick={handleDeleteAccount}
                >
                    I want to delete my account
                </button>
            </div>
        </div>
        {
            confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
        }
    </>
  )
}

export default DeleteAccount