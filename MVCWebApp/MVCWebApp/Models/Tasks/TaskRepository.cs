using Microsoft.EntityFrameworkCore;
using MVCWebApp.Data;
using System;

namespace MVCWebApp.Models.Tasks
{
    public class TaskRepository : ITaskRepository
    {
        private readonly AppDbContext _dbContext;

        public TaskRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Task>> GetAllTasks()
        {
            return await _dbContext.Tasks.ToListAsync();
        }

        public async Task<Task> GetTaskById(int id)
        {
            return await _dbContext.Tasks.FindAsync(id);
        }

        public async System.Threading.Tasks.Task AddTask(Task task)
        {
            _dbContext.Tasks.Add(task);
            await _dbContext.SaveChangesAsync();
        }

        public async System.Threading.Tasks.Task UpdateTask(Task task)
        {
            _dbContext.Tasks.Update(task);
            await _dbContext.SaveChangesAsync();
        }
    }
}
