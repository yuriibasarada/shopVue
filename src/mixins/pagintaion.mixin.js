export default {
    data() {
        return {
            page: +this.$route.query.page || 1,
            pageSize: 8,
            pageCount: 0,
        }
    },
    methods: {
        setupPagination() {
            this.pageCount = Math.ceil( this.PRODUCTS.count / this.pageSize)
        },
        pageChangeHandler(page) {
            // this.loader = true
            this.$router.replace({
                path: this.$route.path,
                query: {page,category_id: this.$route.query.category_id} })
            this.GET_PRODUCTS({
                limit: this.pageSize,
                page,
                category_id: this.current_category_id,
                sort_by: this.sort.sort_by,
                sort_type: this.sort.sort_type
            }).then(() => {
                this.setupPagination()
                this.loader = false
            })
        }
    }
}