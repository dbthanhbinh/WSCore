using System;
using System.ComponentModel.DataAnnotations;

namespace WSCore.Model
{
    public class BaseEntity
    {
        [Key]
        public Guid Id { get; private set; } = Guid.NewGuid();
        [Required]
        public string Status { get; set; }
        [Required]
        public Guid CreatedUser { get; set; }
        
        [Required]
        public DateTime CreatedTime { get; set; } = DateTime.UtcNow;
        
        [Required]
        public Guid LastSavedUser { get; set; }
        
        [Required]
        public DateTime LastSavedTime { get; set; } = DateTime.UtcNow;
        
        [Required]
        public bool IsActive { get; set; } = true;
        
        [Required]
        public bool IsDelete { get; set; } = false;        
    }
}
