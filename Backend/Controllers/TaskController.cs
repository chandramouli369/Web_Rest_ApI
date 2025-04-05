//**Task 5**: Implement the RESTful API endpoints:
//-GET / api / tasks - Retrieve all tasks with pagination
//   - GET /api/tasks/{id} -Retrieve a specific task
//   - POST /api/tasks - Create a new task
//   - PUT / api / tasks /{ id}
//-Update an existing task
//   - DELETE /api/tasks/{id} -Delete a task
//   - Add proper validation and error handling
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web_Rest_API.Db;
using Web_Rest_API.Model;
using System.Net;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace Web_Rest_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<TasksController> _logger; // ✅ Logger

        public TasksController(AppDbContext context, ILogger<TasksController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // ✅ GET: api/tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Task_Entity>>> GetTasks()
        {
            try
            {
                return await _context.Tasks.OrderBy(t => t.DueDate).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving tasks");
                return StatusCode((int)HttpStatusCode.InternalServerError, "An error occurred while retrieving tasks.");
            }
        }

        // ✅ GET: api/tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Task_Entity>> GetTask(int id)
        {
            try
            {
                var task = await _context.Tasks.FindAsync(id);
                if (task == null) return NotFound();
                return task;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving task with ID {id}");
                return StatusCode((int)HttpStatusCode.InternalServerError, "An error occurred while retrieving the task.");
            }
        }

        // ✅ POST: api/tasks
        [HttpPost]
        public async Task<ActionResult<Task_Entity>> CreateTask([FromBody] Task_Entity task)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                _context.Tasks.Add(task);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating task");
                return StatusCode((int)HttpStatusCode.InternalServerError, "An error occurred while creating the task.");
            }
        }

        // ✅ PUT: api/tasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] Task_Entity updatedTask)
        {
            if (id != updatedTask.Id)
                return BadRequest("Task ID mismatch.");

            try
            {
                var task = await _context.Tasks.FindAsync(id);
                if (task == null) return NotFound();

                task.Title = updatedTask.Title;
                task.DueDate = updatedTask.DueDate;
                task.Priority = updatedTask.Priority;
                task.Status = updatedTask.Status;

                await _context.SaveChangesAsync();
                return Ok(task);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating task with ID {id}");
                return StatusCode((int)HttpStatusCode.InternalServerError, "An error occurred while updating the task.");
            }
        }

        // ✅ DELETE: api/tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            try
            {
                var task = await _context.Tasks.FindAsync(id);
                if (task == null) return NotFound();

                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting task with ID {id}");
                return StatusCode((int)HttpStatusCode.InternalServerError, "An error occurred while deleting the task.");
            }
        }
    }
}

