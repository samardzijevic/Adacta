using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MVCWebApp.Models;
using System.Web;
using Task = MVCWebApp.Models.Task;

namespace MVCWebApp.Controllers
{
    [Route("api/[controller]")]
    public class TasksController : Controller
    {
        private readonly ITaskRepository _taskRepository;

        public TasksController(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Task>>> GetAllTasks()
        {
            var tasks = await _taskRepository.GetAllTasks();
            return Ok(tasks);
        }

        // GET: api/tasks/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Task>> GetTask(int id)
        {
            var task = await _taskRepository.GetTaskById(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        // POST: api/tasks
        [HttpPost]
        public async Task<IActionResult> AddTask([FromBody] Task task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _taskRepository.AddTask(task);
            return CreatedAtAction("GetTask", new { id = task.TaskID }, task);
        }

        // POST: api/tasks/{id}
        [HttpPost("update")]
        public async Task<IActionResult> UpdateTask([FromBody] Task taskData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var task = await _taskRepository.GetTaskById(taskData.TaskID);
            if (task == null)
            {
                return NotFound();
            }

            task.Description = taskData.Description;
            task.Status = taskData.Status;

            await _taskRepository.UpdateTask(task);
            return Ok(new { ok = true });
        }


        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Task>>> SearchTasks(string desc, bool? status)
        {
            var alltasks = await this._taskRepository.GetAllTasks();
            if (desc != null)
            {
                alltasks = alltasks.Where(x => x.Description.StartsWith(desc)).ToList();
            }

            if (status.HasValue)
            {
                alltasks = alltasks.Where(x=>x.Status == status.Value).ToList();
            }

            return Ok(alltasks);
        }
    }
}
