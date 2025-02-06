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
                            {/* <th>Date</th> */}
                              <th>Chemical Dosages</th>
                              <th>Tab</th>
                              <th></th>
                              <th></th>
                              <th>Price</th>
                            </tr>
                          </thead>

                          <tbody>
                            {
                                data?.CompletedServiceRoutesDosageActivity?.map((item , i) => {
                                    return(
                                        <tr>
                                        {/* <td>{data?.ServiceDate}</td> */}
                                        <td>{item?.CompletedServiceRoutesDosageDosageValueData?.DosageData?.name}</td>
                                        <td>{item?.values}</td>
                                        <td></td>
                                        <td></td>
                                        <td>${item?.dosage_total}</td>
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
