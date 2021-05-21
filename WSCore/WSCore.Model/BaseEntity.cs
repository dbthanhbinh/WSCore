using System;
using System.ComponentModel.DataAnnotations;

namespace WSCore.Model
{
    public class BaseEntity
    {
        private static string GetNewUuid()
        {
            return Guid.NewGuid().ToString().GetHashCode().ToString("x");
        }

        [Key]
        [StringLength(11)]
        public string Id { get; private set; } = GetNewUuid();

        [Required]
        [StringLength(11)]
        public string CreatedUserId { get; set; }
        
        [Required]
        public DateTime CreatedTime { get; set; } = DateTime.UtcNow;
        
        [Required]
        [StringLength(11)]
        public string LastSavedUserId { get; set; }
        
        [Required]
        public DateTime LastSavedTime { get; set; } = DateTime.UtcNow;
        
        [Required]
        public bool IsActive { get; set; } = true;
        
        [Required]
        public bool IsDelete { get; set; } = false;        
    }
}
