using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tehran2.Models.ViewModels
{
    public class CommentViewModel
    {
        public Comment Comment { get; set; }
        public IEnumerable<Category> Category { get; set; }
        public IEnumerable<SubCategory> SubCategory { get; set; }
    }
}
