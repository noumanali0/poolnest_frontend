import React from 'react'
import { Fragment } from 'react'
import GeneralSettingFormOne from './GeneralSettingFormOne'
import GeneralSettingFormTwo from './GeneralSettingFormTwo'

export function GeneralSettingSubHeader() {
    return (
        <Fragment>
            <div className="row customers generalSettingSubHeader">
                <div className='col-sm-6 generalSububHeader'>
                    <h2>General Setting</h2>
                </div>
                {/* <div className='col-sm-6 generalSububHeaderBtn'>
                    <button className='bluebtn'>
                        {' '}Save{' '}
                    </button>
                </div> */}
            </div>
            <div className='row grayshade cslocation generalSettingForms'>
                <div className='col-sm-6 fulwid'>
                    <GeneralSettingFormOne />
                </div>
                <div className='col-sm-6 fulwid'>
                    <GeneralSettingFormTwo />
                </div>
            </div>
        </Fragment>
    )
}