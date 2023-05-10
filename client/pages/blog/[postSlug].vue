<template>
    <article class="container mx-auto pb-10">
        <div v-if="post" class="prose-xl lg:w-3/4 prose-headings:mb-2 prose-headings:leading-snug prose-p:tracking-tight prose-p:leading-normal prose-li:tracking-tight prose-li:leading-normal prose-h1:heading  mx-auto">
        <NuxtImg :src="`https://strapi.titanizo.pl${post.data.attributes.image.data.attributes.formats.large.url}`" class="aspect-16/9 object-cover w-full" />
            <h1>{{ post.data.attributes.title }}</h1>
            <div v-html="$mdRenderer.render(post.data.attributes.content)" />
        </div>
    </article>
    <SalesSelectedForYou />
    <SalesLastWatched />
</template>

<script setup lang="ts">
const { params } = useRoute();
const postSlug = params.postSlug as string;
const postId = postSlug.substring(0, postSlug.indexOf('--'))
if(!postId) throw createError({ statusCode: 404, message: 'Nieprawidłowy URL postu!' })

type GetPost = {
    data: Post
    meta: Meta
}
const {data: post, error } = await useGetApi<GetPost>(`/posts/${postId}`, {
    populate: '*',
})

if(!post.value) throw createError({ ...error.value })

useHead({
    title: post.value?.data.attributes.title
})



</script>