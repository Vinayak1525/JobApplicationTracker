using JobApplicationTrackerServer.Models;

namespace JobApplicationTrackerServer.Repository
{
    public interface IJobApplicationRepository
    {

        /// <summary>
        /// Gets all Applications.
        /// </summary>
        /// <returns>A list of all applications.</returns>
        Task<IEnumerable<JobApplication>> GetAllAsync();

        /// <summary>
        /// Gets an application by id.
        /// </summary>
        /// <param name="id">Id of the application to be retrived.</param>
        /// <returns>The application if exists.</returns>
        Task<JobApplication?> GetByIdAsync(int id);

        /// <summary>
        /// Adds a new application.
        /// </summary>
        /// <param name="application">New application to be added.</param>
        /// <returns>The newly added application.</returns>
        Task AddAsync(JobApplication application);

        /// <summary>
        /// Updates an existing application.
        /// </summary>
        /// <param name="application">Application to be updated.</param>
        /// <returns>The status code.</returns>
        Task UpdateAsync(JobApplication application);

        /// <summary>
        /// Deletes an application.
        /// </summary>
        /// <param name="application">Application to be deleted.</param>
        /// <returns>The status code.</returns>
        Task DeleteAsync(JobApplication application);
    }
}