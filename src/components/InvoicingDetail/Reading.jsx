import React from 'react'

const Dosage = ({data}) => {
  return (
    <div>
        <div className="row invoicingReport">
        <div className="col-sm-12">
                      <div className="routedashboard invoiceTable ">
                        <table>
                          <thead>
                            <tr>
                              <th> Reading</th>
                              <th></th>
                              <th></th>
                              <th></th>
                              <th>Price</th>
                            </tr>
                          </thead>

                          <tbody>
                            {
                                data?.CompletedServiceRoutesReadingActivity?.map((item , i) => {
                                    return(
                                        <tr>
                                        <td>{item?.CompletedServiceRoutesReadingValueData?.ReadingValuesData?.name}</td>
                                        <td>{item?.values}</td>
                                        <td></td>
                                        <td></td>
                                        <td>{item?.CompletedServiceRoutesReadingValueData?.unit_of_measurement}</td>
                                      </tr>
                                    )
                                })
                            }
                           
                          
                          </tbody>
                        </table>
                      </div>
                    </div>
        </div>
    </div>
  )
}

export default Dosage
