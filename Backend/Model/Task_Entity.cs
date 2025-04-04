using System.ComponentModel.DataAnnotations;

namespace Web_Rest_API.Model
{
    public class Task_Entity
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        //public string? Description { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public string Priority { get; set; }  // "Low", "Medium", "High"

        [Required]
        public string Status { get; set; }

    }
}
