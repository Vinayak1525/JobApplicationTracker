using Microsoft.EntityFrameworkCore;
using JobApplicationTrackerServer.Models;

namespace JobApplicationTrackerServer.Data
{
    public class ApplicationDbContext : DbContext
    {
        /// <summary>
        /// Initializes a new instance of the ApplicationDbContext class.
        /// </summary>
        /// <param name="options">Custom options for the application database context.</param>
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options){}

    
        /// <summary>
        /// The Job applications
        /// </summary>
        public DbSet<JobApplication> JobApplications { get; set; }
    }
}