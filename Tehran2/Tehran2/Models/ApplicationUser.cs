using Microsoft.AspNetCore.Identity; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tehran2.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Avatar { get; set; }
        public string StudentCode { get; set; }
        public string Major { get; set; }
        public DateTime JoinDate { get; set; }
        public DateTime BirthDate { get; set; }
    }
}
