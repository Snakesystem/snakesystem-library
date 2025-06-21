<script>
    const category = [
        {
            name: 'backend',
            image: '/img/backend.png',
            title: 'Backend',
            desc: 'Intip catatan tentang aplikasi backend dengan performa tinggi dan modern sekalian nyobain.',
            list_tech: ['rest', 'graphql', 'rust', 'actix-web', 'bun', 'hono', 'nodejs', 'nestjs', 'laravel-api', '.net']
        },
        {
            name: 'frontend',
            image: '/img/frontend.png',
            title: 'Frontend',
            desc: 'Lu mungkin bakal suka liat catatan tentang tampilan aplikasi yang oke dan interaktif.',
            list_tech: ['svelte/sveltekit', 'react/nextjs', 'sass', 'tailwind', 'bootstrap', 'tauri', 'handlebars', 'flutter']
        },
        { 
            name: 'fullstack',
            image: '/img/fullstack.png',
            title: 'Fullstack',
            desc: 'Kombinasi backend dan frontend dalam satu catatan mungkin bisa jadi inspirasi baru bang.',
            list_tech: ['graphql', 'prisma', 'session', 'handlebars', 'jwt', 'architecture', 'blade', 'laravel', 'web-socket']
        },
        {
            name: 'random',
            image: '/img/random.png',
            title: 'Random',
            desc: 'Jangan ngoding mulu bang ntar pingsan kita, kita juga manusia bukan robot. Robot aja bisa error.',
            list_tech: ['internet-information-service', 'nginx', 'laragon', 'gajelas', 'tapi', 'bisa', 'error', 'olahraga', 'makan']
        },
        {
            name: 'about',
            image: '/img/about.png',
            title: 'About',
            desc: 'Kepoin gue dong bang, siapa tau bisa colab bikin teknologi.',
            list_tech: ['github', 'linkedin', 'instagram', 'twitter']
        }
    ]
</script>

<div class="container h-100 d-flex justify-content-center flex-column" data-aos="fade-right" data-aos-duration="1000">
    <div class="judul">
        <a class="text-start btn back" href="/"><i class="bi bi-arrow-left-circle me-2"></i>Kembali Ke Home</a>
        <h3 class="text-center">Catatan</h3>
        <p class="text-center">Catatan gue—tutorial, wawasan teknologi, opini gajelas, kadang membingungkan, dan ide - ide tentang teknologi yang disusun untuk memicu ide dan terkadang memecahkan masalah kadang juga engga.</p>
    </div>
    <div class="row justify-content-center scroll-custom">
        {#each category as cat, i}
            <div class="col-md-4 my-3" key={i}>
                <a class="card p-3 text-decoration-none h-100" href="/notes/{cat.name}">
                    <img src="{cat.image}" class="card-img-top" alt="{cat.title}">
                    <div class="card-body">
                        <h4 class="card-title">{cat.title}</h4>
                        <p class="card-text">{cat.desc}</p>
                    </div>
                    <div class="card-footer">
                        {#if cat.list_tech}
                            <div class="d-flex flex-row gap-2 flex-wrap">
                                {#each cat.list_tech as tech}
                                    <span class="badge bg-primary">#{tech}</span>
                                {/each}
                            </div>
                        {/if}
                    </div>
                </a>
            </div>
        {/each}
    </div>
</div>

<style scoped lang="scss">
    .row {
        overflow-y: auto;
    }

    .back {
      font-size: 1.1rem;
      padding: 0;
      padding: 2rem 0 1rem 0;
    }

    .back:hover {
      color: #fff;
      text-decoration: none;
    }
    .card:hover .card-img-top {
        filter: blur(3px);
        transition: filter 0.3s ease;
    }

    .card:hover h4, .card:hover p {
        text-decoration: underline;
    }

    @media screen and (max-width: 768px) {

        .row {
            margin-top: 0.5rem;
        }

        .judul {
            background-color: #181b1d;
            border-radius: 10px;
            margin-top: 1rem;
            padding: 0 1rem;

            p {
                font-size: 0.9rem;
            }

            .back {
                padding: 0.5rem 0;
            }
        }

        .col-md-4 {
            margin: 0.2rem 0 !important;
        }
    }
    
</style>