import React from 'react'
import adminrejectedrequeststyles from './AdminRejectedRequests.module.css'

function Trial({areaList,volunteerList}) {
  return (
    <div className="modal fade mt-5" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Assign Request</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form method="POST">
                <div className="modal-body">
                <form method="POST" className={`form-group m-lg-5 ${adminrejectedrequeststyles.adminformgroup}`}>
                <label htmlFor="source">Donation Area</label>
                        <select className="form-select mb-3" aria-label="Default select example"  required>
                          {areaList}
                        </select> 
                      <label htmlFor="source">Volunteer</label>
                        <select className="form-select mb-3" aria-label="Default select example"  required>
                        {volunteerList}
                        </select>
                    </form>
                  </div>
                <div className="modal-footer">
                  <button type="button" className={`btn btn-red book ${adminrejectedrequeststyles.btnred}`} data-bs-dismiss="modal">Close</button>
                  <button type="button" className={`btn btn-red book ${adminrejectedrequeststyles.btnred}`} data-bs-dismiss="modal">Assign</button>
                </div>
                </form>
              </div>
            </div>
          </div>
  )
}

export default Trial