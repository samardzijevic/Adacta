namespace MVCWebApp.Models
{
    public interface ITaskRepository
    {
        Task<IEnumerable<Task>> GetAllTasks();
        Task<Task> GetTaskById(int id);
        System.Threading.Tasks.Task AddTask(Task task);
        System.Threading.Tasks.Task UpdateTask(Task task);
    }
}
