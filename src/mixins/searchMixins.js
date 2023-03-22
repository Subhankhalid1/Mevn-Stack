export default{
    computed:{
        filteredBlogs() {
            return this.products.filter(blog => {
              return blog.title.match(search.value);
            });
          }
    }
}