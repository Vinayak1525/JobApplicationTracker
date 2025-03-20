using JobApplicationTrackerServer.Models;
using JobApplicationTrackerServer.Repository;
using Microsoft.AspNetCore.Mvc;

namespace JobApplicationTrackerServer.Controllers;

    [Route("api/[controller]")]
    [ApiController]
    public class JobApplicationController : ControllerBase
    {
        private readonly IJobApplicationRepository _repository;

        public JobApplicationController(IJobApplicationRepository repository)
        {
            _repository = repository;
        }

        /// <summary>
        /// Gets all the applications.
        /// </summary>
        /// <returns>The applications if exists.</returns>
        [HttpGet]
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<JobApplication>>> GetAll()
        {
            return Ok(await _repository.GetAllAsync());
        }

        /// <summary>
        /// gets an application by id.
        /// </summary>
        /// <param name="id">Id of the application.</param>
        /// <returns>The application if exists.</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<JobApplication>> GetById(int id)
        {
            var application = await _repository.GetByIdAsync(id);

            if(application == null)
            {
                return NotFound();
            }
            return Ok(application);
        }  

        /// <summary>
        /// Adds new application.
        /// </summary>
        /// <param name="application">Application which needs to be created.</param>
        /// <returns>The newly added application.</returns>
        [HttpPost("Create")]
        public async Task<IActionResult> Create(JobApplication application)
        {
            if(application == null)
            {
                return BadRequest("Invalid request data.");
            }

            try
            {
                await _repository.AddAsync(application);
                return CreatedAtAction(nameof(GetById), new { id = application.Id}, application);
            }
            catch(InvalidOperationException)
            {
                return Conflict("A job applicaiton for this company and position already exists.");
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        /// <summary>
        /// Updates existing application.
        /// </summary>
        /// <param name="id">Id of the application.</param>
        /// <param name="application">Application which needs to be updated.</param>
        /// <returns>The status code.</returns>
        [HttpPut("Update/{id}")]
        public async Task<IActionResult> Update(int id, JobApplication application)
        {
            if(id != application.Id)
            {
                return BadRequest();
            }

            await _repository.UpdateAsync(application);
            return NoContent();
        }


        /// <summary>
        /// Deletes an application by id.
        /// </summary>
        /// <param name="id">The id of the application which needs to be deleted</param>
        /// <returns>The status code.</returns>
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var application = await _repository.GetByIdAsync(id);
            if(application == null)
            {
                return NotFound();
            }
            await _repository.DeleteAsync(application);
            return NoContent();
        }
    }
