using JobApplicationTrackerServer.Data;
using JobApplicationTrackerServer.Models;
using Microsoft.EntityFrameworkCore;

namespace JobApplicationTrackerServer.Repository;

public class JobApplicationRepository : IJobApplicationRepository
{
    private readonly ApplicationDbContext _context;

    public JobApplicationRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <inheritdoc/>
    public async Task<IEnumerable<JobApplication>> GetAllAsync()
    {
        return await _context.JobApplications.ToListAsync();
    }

    /// <inheritdoc/>
    public async Task<JobApplication?> GetByIdAsync(int id)
    {
        return await _context.JobApplications.FindAsync(id);
    }

    /// <inheritdoc/>
    public async Task AddAsync(JobApplication application)
    {
        var existingApplication = await _context.JobApplications
            .FirstOrDefaultAsync(app => app.CompanyName.ToLower() == application.CompanyName.ToLower() && app.Position.ToLower() == application.Position.ToLower());

        if(existingApplication != null)
        {
            throw new InvalidOperationException("A job applicaiton for this company and position already exists.");
        }

        _context.JobApplications.Add(application);
        await _context.SaveChangesAsync();
    }

    /// <inheritdoc/>
    public async Task UpdateAsync(JobApplication application)
    {
        _context.JobApplications.Update(application);
        await _context.SaveChangesAsync();
    }

    /// <inheritdoc/>
        public async Task DeleteAsync(JobApplication application)
    {
        _context.JobApplications.Remove(application);
        await _context.SaveChangesAsync();
    }
}