////using Microsoft.AspNetCore.Mvc;
////using Microsoft.EntityFrameworkCore;
////using Web_Rest_API.Db;
////using Web_Rest_API.Model;

////namespace Web_Rest_API.Controllers
////{
////    [Route("api/[controller]")]
////    [ApiController]
////    public class TaskController : ControllerBase
////    {
////        private readonly AppDbContext _context;

////        public TaskController(AppDbContext context)
////        {
////            _context = context;
////        }

////        // GET: api/task?page=1&pageSize=10
////        [HttpGet]
////        public async Task<ActionResult<IEnumerable<Task_Entity>>> GetTasks()
////        {
////            var tasks = await _context.Tasks
////                .OrderBy(t => t.DueDate)
////                .ToListAsync();

////            return Ok(tasks);
////        }

////        // GET: api/task/{id}
////        [HttpGet("{id}")]
////        public async Task<ActionResult<Task_Entity>> GetTask(int id)
////        {
////            var task = await _context.Tasks.FindAsync(id);
////            if (task == null) return NotFound();
////            return Ok(task);
////        }

////        // POST: api/task
////        [HttpPost]
////        public async Task<ActionResult<Task_Entity>> CreateTask(Task_Entity task)
////        {
////            if (!ModelState.IsValid)
////                return BadRequest(ModelState);

////            _context.Tasks.Add(task);
////            await _context.SaveChangesAsync();

////            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
////        }

////        // PUT: api/task/{id}
////        [HttpPut("{id}")]
////        public async Task<IActionResult> UpdateTask(int id, Task_Entity task)
////        {
////            if (id != task.Id)
////                return BadRequest("ID mismatch.");

////            _context.Entry(task).State = EntityState.Modified;

////            try
////            {
////                await _context.SaveChangesAsync();
////            }
////            catch (DbUpdateConcurrencyException)
////            {
////                if (!_context.Tasks.Any(t => t.Id == id))
////                    return NotFound();

////                throw;
////            }

////            return NoContent();
////        }

////        // DELETE: api/task/{id}
////        [HttpDelete("{id}")]
////        public async Task<IActionResult> DeleteTask(int id)
////        {
////            var task = await _context.Tasks.FindAsync(id);
////            if (task == null) return NotFound();

////            _context.Tasks.Remove(task);
////            await _context.SaveChangesAsync();

////            return NoContent();
////        }
////    }
////}
//// ✅ TaskController.cs (Full Updated Code)
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Web_Rest_API.Db;
//using Web_Rest_API.Model;

//namespace Web_Rest_API.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class TasksController : ControllerBase
//    {
//        private readonly AppDbContext _context;

//        public TasksController(AppDbContext context)
//        {
//            _context = context;
//        }

//        // ✅ GET: api/tasks
//        [HttpGet("abc")]
//        public async Task<ActionResult<IEnumerable<Task_Entity>>> GetTasks()
//        {
//            return await _context.Tasks.OrderBy(t => t.DueDate).ToListAsync();
//        }

//        // ✅ GET: api/tasks/5
//        [HttpGet("{id}")]
//        public async Task<ActionResult<Task_Entity>> GetTask(int id)
//        {
//            var task = await _context.Tasks.FindAsync(id);
//            if (task == null) return NotFound();
//            return task;
//        }

//        // ✅ POST: api/tasks
//        [HttpPost]
//        public async Task<ActionResult<Task_Entity>> CreateTask(Task_Entity task)
//        {
//            _context.Tasks.Add(task);
//            await _context.SaveChangesAsync();
//            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
//        }

//        // ✅ PUT: api/tasks/5
//        [HttpPut("{id}")]
//        public async Task<IActionResult> UpdateTask(int id, Task_Entity updatedTask)
//        {
//            var task = await _context.Tasks.FindAsync(id);
//            if (task == null) return NotFound();

//            task.Title = updatedTask.Title;
//            //task.Description = updatedTask.Description;
//            task.DueDate = updatedTask.DueDate;
//            task.Priority = updatedTask.Priority;
//            task.Status = updatedTask.Status;
//            //task.IsCompleted = updatedTask.IsCompleted;

//            await _context.SaveChangesAsync();
//            return Ok(task);
//        }

//        // ✅ DELETE: api/tasks/5
//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteTask(int id)
//        {
//            var task = await _context.Tasks.FindAsync(id);
//            if (task == null) return NotFound();

//            _context.Tasks.Remove(task);
//            await _context.SaveChangesAsync();
//            return NoContent();
//        }
//    }
//}

// ✅ TaskController.cs (Full Updated Code)
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web_Rest_API.Db;
using Web_Rest_API.Model;

namespace Web_Rest_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ GET: api/tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Task_Entity>>> GetTasks()
        {
            return await _context.Tasks.OrderBy(t => t.DueDate).ToListAsync();
        }

        // ✅ GET: api/tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Task_Entity>> GetTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();
            return task;
        }

        // ✅ POST: api/tasks
        [HttpPost]
        public async Task<ActionResult<Task_Entity>> CreateTask([FromBody] Task_Entity task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        // ✅ PUT: api/tasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] Task_Entity updatedTask)
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

        // ✅ DELETE: api/tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
