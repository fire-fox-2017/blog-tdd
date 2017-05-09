Vue.component('list-of-blog', {
    props: ['datablog'],
    template: `<li>
        <a href="#anch1" data-scroll v-for="blog in datablog">
            <h1 v-on:click="select(blog.title, blog.author, blog.content)">{{blog.title}}</h1>
        </a>
    </li>`,
    methods: {
        select(title, author, content) {
            // alert('Masukkkk')
            console.log(title + ' ' + author + ' ' + content);
            this.$emit('select', title, author, content)
        }
    }

})

Vue.component('detail-of-blog', {
    props: ['detail'],
    template: `<div id="page-content-wrapper" style="margin-left: 250px">
              <p>{{detail}}</p>
              </div>`
})

// Vue.component('blog-list', {
//     props: ['data'],
//     template: `
//     <section class="section">
//       <div class="container">
//         <blog-item v-for="blog in blogs" :detail="blog"></blog-item>
//       </div>
//     </section>
//   `
// })

// Vue.component('blog-item', {
//     props: ['detail'],
//     template: `
//     <div class="content">
//       <h1>{{detail.author}}</h1>
//       <h1>{{detail.title}}</h1>
//       <p>{{detail.content}}</p>
//       <h3>{{detail.email}}</h3>
//     </div>
//   `
// })

var app = new Vue({
    el: '#app',
    data: {
        message: "Hi",
        blogs: [],
        content: ''
    },
    methods: {
        detailBlog: function(title, author, content) {
            console.log(title + ' ' + author + ' ' + content);
            let self = this
            self.content = title + ' ' + author + ' ' + content
        },
        getAllBlog: function() {
            let self = this
            axios.get('http://localhost:3000/api/blogs')
                .then(result => {
                    console.log('-------------created');
                    console.log(result);
                    let dataBlog = result.data
                    // console.log(typeof dataBlog);
                    self.blogs = dataBlog
                })
                .catch(error => {
                    alert('Data tidak ada')
                    console.log(error);
                })
        }
    },
    mounted: function() {
        this.getAllBlog()
    }
})