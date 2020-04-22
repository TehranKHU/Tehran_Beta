using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tehran2.Data;
using Tehran2.Models;
using Tehran2.Models.ViewModels;
using Tehran2.Utility;

namespace Tehran2.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class CommentController : Controller
    {
        private readonly ApplicationDbContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;

        [BindProperty]
        public CommentViewModel CommentVM { get; set; }

        public CommentController(ApplicationDbContext db , IWebHostEnvironment webHostEnvironment)
        {
            _db = db;
            _webHostEnvironment = webHostEnvironment;
            CommentVM = new CommentViewModel()
            {
                Category = _db.Category,
                Comment = new Models.Comment()
            };
        }

        public async Task<IActionResult> Index()
        {
            var comments = await _db.Comment.Include(m=>m.Category).Include(m=>m.SubCategory).ToListAsync();
            return View(comments);
        }

        //GET - CREATE
        public IActionResult Create()
        {
            return View(CommentVM);
        }

        [HttpPost,ActionName("Create")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreatePOST()
        {
            CommentVM.Comment.SubCategoryId = Convert.ToInt32(Request.Form["SubCategoryId"].ToString());

            if(!ModelState.IsValid)
            {
                return View(CommentVM);
            }

            _db.Comment.Add(CommentVM.Comment);
            await _db.SaveChangesAsync();

            //Work on the image saving section

            string webRootPath = _webHostEnvironment.WebRootPath;
            var files = HttpContext.Request.Form.Files;

            var CommentFromDb = await _db.Comment.FindAsync(CommentVM.Comment.Id);

            if(files.Count>0)
            {
                //files has been uploaded
                var uploads = Path.Combine(webRootPath, "images");
                var extension = Path.GetExtension(files[0].FileName);

                using (var filesStream = new FileStream(Path.Combine(uploads, CommentVM.Comment.Id + extension), FileMode.Create))
                {
                    files[0].CopyTo(filesStream);
                }
                CommentFromDb.Image = @"\images\" + CommentVM.Comment.Id + extension;
            }
            else
            {
                //no file was uploaded , so use default
                var uploads = Path.Combine(webRootPath, @"images\" + SD.DefaultImage);
                System.IO.File.Copy(uploads, webRootPath + @"\images\" + CommentVM.Comment.Id + ".png");
                CommentFromDb.Image = @"\images\" + CommentVM.Comment.Id + ".png";
            }
            await _db.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }

        //GET - EDIT
        public async Task<IActionResult> Edit(int? id)
        {
            if(id == null)
            {
                return NotFound();
            }

            CommentVM.Comment = await _db.Comment.Include(m => m.Category).Include(m => m.SubCategory).SingleOrDefaultAsync(m => m.Id == id);
            CommentVM.SubCategory = await _db.SubCategory.Where(s => s.CategoryId == CommentVM.Comment.CategoryId).ToListAsync();

            if(CommentVM.Comment == null)
            {
                return NotFound();
            }
            return View(CommentVM);
        }

        [HttpPost, ActionName("Edit")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditPOST(int? id)
        {
            if(id == null)
            {
                return NotFound();
            }
            CommentVM.Comment.SubCategoryId = Convert.ToInt32(Request.Form["SubCategoryId"].ToString());

            if (!ModelState.IsValid)
            {
                CommentVM.SubCategory = await _db.SubCategory.Where(s => s.CategoryId == CommentVM.Comment.CategoryId).ToListAsync();
                return View(CommentVM);
            }

            //Work on the image saving section

            string webRootPath = _webHostEnvironment.WebRootPath;
            var files = HttpContext.Request.Form.Files;

            var CommentFromDb = await _db.Comment.FindAsync(CommentVM.Comment.Id);

            if (files.Count > 0)
            {
                //New Image has been uploaded
                var uploads = Path.Combine(webRootPath, "images");
                var extension_new = Path.GetExtension(files[0].FileName);

                //Delete the original file
                var imagePath = Path.Combine(webRootPath, CommentFromDb.Image.TrimStart('\\'));

                if(System.IO.File.Exists(imagePath))
                {
                    System.IO.File.Delete(imagePath);
                }

                //we will upload new file
                using (var filesStream = new FileStream(Path.Combine(uploads, CommentVM.Comment.Id + extension_new), FileMode.Create))
                {
                    files[0].CopyTo(filesStream);
                }
                CommentFromDb.Image = @"\images\" + CommentVM.Comment.Id + extension_new;
            }

            CommentFromDb.Name = CommentVM.Comment.Name;
            CommentFromDb.Description = CommentVM.Comment.Description;
            CommentFromDb.CategoryId = CommentVM.Comment.CategoryId;
            CommentFromDb.SubCategoryId = CommentVM.Comment.SubCategoryId;

            await _db.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }

        //GET : Details Comment
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            CommentVM.Comment = await _db.Comment.Include(m => m.Category).Include(m => m.SubCategory).SingleOrDefaultAsync(m => m.Id == id);

            if (CommentVM.Comment == null)
            {
                return NotFound();
            }

            return View(CommentVM);
        }

        //GET : Delete Comment
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            CommentVM.Comment = await _db.Comment.Include(m => m.Category).Include(m => m.SubCategory).SingleOrDefaultAsync(m => m.Id == id);

            if (CommentVM.Comment == null)
            {
                return NotFound();
            }

            return View(CommentVM);
        }

        //POST Delete Comment
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            string webRootPath = _webHostEnvironment.WebRootPath;
            Comment comment = await _db.Comment.FindAsync(id);

            if (comment != null)
            {
                var imagePath = Path.Combine(webRootPath, comment.Image.TrimStart('\\'));

                if (System.IO.File.Exists(imagePath))
                {
                    System.IO.File.Delete(imagePath);
                }
                _db.Comment.Remove(comment);
                await _db.SaveChangesAsync();

            }

            return RedirectToAction(nameof(Index));
        }
    }
}