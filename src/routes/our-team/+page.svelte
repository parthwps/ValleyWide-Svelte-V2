<script lang="ts">
	import { Col, Container, Row } from 'sveltestrap';
	import { lazyLoad } from '$lib/components/lazyload.js';

	import PageBanner from '$lib/components/layout/PageBanner.svelte';
	import Contactform from '$lib/components/layout/Contactform.svelte';
	import Modal from '$lib/components/layout/Modal.svelte';
	import { textAnimate, fly, fadeIn, slide, slowDownSection } from '$lib/GsapAnimation.js';

	export let data;
	let domain = 'https://api.ulfbuilt.com';
	let ourTeam = data.data.attributes;
	console.log(ourTeam);
	let showModal = false;
	let memberName = '';
	let memberImage = '';
	let memberPosition = '';
	let memberContent = '';

	function getMemberIndex(index) {

		memberName = ourTeam.team_members.data[index].attributes.name.replace(
			/^\s*\w+/,
			'<span>$&</span>'
		);
		memberImage = ourTeam.team_members.data[index].attributes.memberPhoto.data.attributes.url;
		memberPosition = ourTeam.team_members.data[index].attributes.position;
		memberContent = ourTeam.team_members.data[index].attributes.content;
	}

	function stopScroll(event) {
		event.stopPropagation();
	}

	import { onMount } from 'svelte';
	import { loadingCursor } from '$lib/cursorChange.js';
	onMount(() => {
		loadingCursor();
	});
</script>

<svelte:head>
	<title>{data.data.attributes.title ? data.data.attributes.title : 'Our Team'}</title>
</svelte:head>
<PageBanner
	title={data.data.attributes.title ? data.data.attributes.title : 'Our Team'}
	subTitle={data.data.attributes.Subheading ? data.data.attributes.Subheading : ''}
	banner="{domain}{data.data.attributes.Cover.data.attributes.formats.large_x2.url
		? data.data.attributes.Cover.data.attributes.formats.large_x2.url
		: data.data.attributes.Cover.data.attributes.url}"
	bannerMobile="{domain}{data.data.attributes.Cover.data.attributes.formats.medium.url}"
/>
<section class="our-team mvw-10" in:slowDownSection gsap-start="5% bottom" id="our-team">
	<Container>
		<Row>
			<Col md="10" class="mx-auto">
				<h2
					class="stc pb-4 text-center text-animate secondary-font"
					in:textAnimate
					id="team_heading"
					gsap-duration="1.5"
				>
					{ourTeam.SecondSectionTitle ? ourTeam.SecondSectionTitle : ''}
				</h2>
				<p class="two-columns" in:fadeIn id="team_content" gsap-duration="1" gsap-delay="0.5">
					{@html ourTeam.content ? ourTeam.content : ''}
				</p>
				{#if ourTeam.SecondSectionImage.data}
					<div class="heading-image">
						<img
							in:fadeIn
							id="team_image"
							gsap-duration="1.5"
							gsap-start="top 90%"
							use:lazyLoad={domain + ourTeam.SecondSectionImage.data.attributes.formats.large.url ||
								domain + ourTeam.SecondSectionImage.data.attributes.url}
							placeholder="{domain}{ourTeam.SecondSectionImage.data.attributes.url}"
							alt="Team Philosophy"
							width={ourTeam.SecondSectionImage.data.attributes.width}
							height={ourTeam.SecondSectionImage.data.attributes.height}
						/>
					</div>
				{/if}
			</Col>
		</Row>
	</Container>
</section>
<section class="owner">
	<Container>
		<Row noGutters>
			<Col md="6" class="tm-img">
				<div>
					<img
						in:fadeIn
						id="owner_image"
						gsap-duration="1.5"
						alt={ourTeam.team_member_owner.data.attributes.name}
						use:lazyLoad={domain +
							ourTeam.team_member_owner.data.attributes.memberPhoto.data.attributes.formats.large
								.url ||
							domain + ourTeam.team_member_owner.data.attributes.memberPhoto.data.attributes.url}
					/>
					<div class="tm-box wtc">
						<h3 class="pfont" in:slide id="owner_name" gsap-duration="1.5" gsap-x="-5">
							{ourTeam.team_member_owner.data.attributes.name
								? ourTeam.team_member_owner.data.attributes.name
								: ''}
						</h3>
						<h4 class="pfont" in:slide id="owner_title" gsap-duration="1.5" gsap-x="-5">
							{ourTeam.team_member_owner.data.attributes.position
								? ourTeam.team_member_owner.data.attributes.position
								: ''}
						</h4>
					</div>
				</div>
			</Col>
			<Col md="6" class="owner-quote-container">
				<div class="owner-quote" in:fadeIn id="owner-quote-wrapper" gsap-duration="1.5">
					<h3
						class="stc line-height-2 text-center"
						in:fly
						id="owner_quote"
						gsap-duration="1.5"
						gsap-y="20"
					>
						{@html ourTeam.ownerquote ? ourTeam.ownerquote : ''}
					</h3>
				</div>
			</Col>
		</Row>
	</Container>
</section>
<section class="paragraph1 mvw-10" in:slowDownSection  id="paragraph1">
	<Container>
		<h4>
			{@html ourTeam.team_member_owner.data.attributes.content
				? ourTeam.team_member_owner.data.attributes.content
				: ''}
		</h4>
		<!-- <h4>{@html ourTeam.para1 ? ourTeam.para1 : ''}</h4> -->
	</Container>
</section>
<section class="team-members">
	<Container>
		<Row>
			<h2
				class="sfont stc mb-2 md:mb-5 text-center text-animate secondary-font"
				in:textAnimate
				id="member_heading"
				gsap-duration="1.5"
			>
				{ourTeam.title ? ourTeam.title : ''}
			</h2>
			<Col md={{ size: 8, offset: 2 }} class="inner-col team-member-part">
				<Row>
					{#each ourTeam.team_members.data as member, index}
						<Col md="6">
							<!-- <a href="/our-team/{member.attributes.slug}"> -->
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div
								class="our-team__member"
								on:click={() => getMemberIndex(index)}
								on:click={() => (showModal = true)}
							>
								<img
									in:fadeIn
									id="member_image{index}"
									gsap-start="top bottom"
									gsap-duration=".5"
									width={member.attributes.memberPhoto.data.attributes.width}
									height={member.attributes.memberPhoto.data.attributes.height}
									use:lazyLoad={domain +
										member.attributes.memberPhoto.data.attributes.formats.large.url ||
										domain + member.attributes.memberPhoto.data.attributes.url}
									alt="member"
								/>

								<div class="tm-box wtc px-5 py-3" style="bottom: 1rem;">
									<!-- our-team__member_caption class removed -->
									<h5
										class="pfont"
										in:slide
										id="member_name{index}"
										gsap-duration=".5"
										gsap-x="-10"
									>
										{member.attributes.name}
									</h5>
									<p
										class="pfont"
										in:slide
										id="member_title{index}"
										gsap-duration=".5"
										gsap-x="-10"
									>
										{member.attributes.position}
									</p>
								</div>
							</div>
							<!-- </a> -->
						</Col>
					{/each}

					<Modal bind:showModal>
						<div class="memberModal" on:mousewheel={stopScroll}>
							<div class="memberModal__image">
								{#if memberImage}
									<img src={domain + memberImage} alt="member" />
								{/if}
							</div>
							<div class="memberModal__details">
								<h5 class="pfont">{@html memberName ? memberName : ''}</h5>
								<p class="position">{memberPosition ? memberPosition : ''}</p>
								{#if memberContent}
									<p class="content" on:mousewheel={stopScroll}>{@html memberContent}</p>
								{/if}
							</div>
						</div>
					</Modal>
				</Row>
			</Col>
		</Row>
	</Container>
</section>
<section class="ourteam5 mvw-10" id="ourteam5">
	<Container>
		<div>
			<h4>{ourTeam.para2 ? ourTeam.para2 : ''}</h4>
			<h4>{ourTeam.para3 ? ourTeam.para3 : ''}</h4>
			<h4>
				{ourTeam.team_member_owner.data.attributes.name
					? ourTeam.team_member_owner.data.attributes.name
					: ''}
			</h4>
		</div>
	</Container>
</section>

<Contactform />

<style lang="scss">
	// section{
	//     margin: 10rem 0;
	//         @include media-max(sm){
	//             margin: 5rem 0;
	//         }
	// }
	.our-team {
		// margin-top: 5rem;
		// min-height: 80rem;
		// display: flex;
		// align-items: center;
		// justify-content: center;
		// @include media-max(ipadmini){
		// 	min-height: unset;
		// }
		@include media-max(sm) {
				padding: 0 1.375rem;
			}
		#team_heading {
			justify-content: center;
		}
		:global(p) {
			font-size: 1.25rem;
			line-height: 2rem;
		}
		.heading-image {
			margin: 2rem 0;
			position: relative;
			height: 35.625rem;
			@include media-max(ipadmini) {
				height: auto;
				margin-bottom: 0;
			}
			overflow: hidden;
			img {
				height: inherit;
			}
		}
		img {
			width: 100%;
			max-width: 100%;
			height: auto;
			object-fit: cover;
		}
		&__member {
			position: relative;
			margin-top: 1.5rem;
			cursor: pointer;
			// min-height: 26rem;
			@include media-max(ipadmini) {
				min-height: 26vh;
			}
			p {
				color: #aca7a7;
				margin: 0px;
				line-height: 1.5rem;
			}
			&:hover {
				a {
					opacity: 1;
					background-color: rgb(8, 161, 216, 0.3);
					transition: 1.5s;
				}

				.tm-box {
					background: $primary-color;
					transition: 1.5s;
					h5,
					p {
						color: $figmablack;
					}
				}
			}
			a {
				opacity: 0;
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
				transition: 0.3s;
			}
			&_caption {
				position: absolute;
				bottom: 0;
				text-align: left;
				width: 100%;
				opacity: 1;
				color: #fff;
				padding: 0.8rem;
				h2 {
					font-size: 1.2rem;
					font-weight: 300;
					margin-bottom: 0;
				}
				span {
					font-weight: 300;
				}
			}
		}
	}
	:global(.tm-img) {
		position: relative;
	}
	.owner {
		display: flex;
		align-items: center;
		justify-content: center;
		// @include media-max(ipadmini){
		// 	min-height: unset;
		// }
	}
	.tm-box {
		position: absolute;
		z-index: 6;
		bottom: 2rem;
		background-color: #1e2d39;
		padding: 0.65rem 2rem 0.8rem !important;
		width: 90%;
		line-height: 0.5;
		@include media-max(sm) {
			position: relative;
			text-align: center;
			bottom: 0;
			padding: 0.5rem 1rem 0.625rem !important;
		}
		h3,
		h4 {
			margin-bottom: 0;
			font-weight: 400;
		}
		h5 {
			margin-bottom: 0;
			@include media-max(sm) {
			}
		}
	}
	:global(.owner-quote-container) {
		padding: 2rem 0;
		@include media-max(sm) {
			padding: 0;
		}
	}
	.owner-quote {
		background-color: #e3ceb5;
		height: 100%;
		display: flex;
		h3 {
			display: flex;
			justify-content: center;
			flex-direction: column;
			padding: 3rem;
			@include media-max(sm) {
				padding: 2rem 1rem;
			}
		}
	}
	.paragraph1 {
		text-align: center;
		max-width: 960px;
		margin-left: auto;
		margin-right: auto;
		// min-height: 100vh;
		// display: flex;
		// align-items: center;
		// justify-content: center;
		// @include media-max(ipadmini){
		//     min-height: unset;
		// }
		@include media-max(sm){
			margin: 3.75rem 0;
		}
		h4 {
			font-family: $primary-font;
			font-weight: 400;
			padding-bottom: 2rem;
			line-height: 2.375rem;
			@include media-max(sm) {
			line-height: 2.25rem;
			padding: 0 1.375rem ;
		}
		}
	}
	.ourteam5 {
		text-align: center;
		max-width: 960px;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		// min-height: 100vh;
		// display: flex;
		// align-items: center;
		// justify-content: center;
		// @include media-max(ipadmini){
		//     min-height: unset;
		// }
		
		h4 {
			font-family: $primary-font;
			font-weight: 400;
			padding-bottom: 2rem;
			line-height: 2.375rem;
			padding: 0 1rem 2rem 1rem;
		}
		h4:last-child {
			@include media-min(sm) {
				text-align: right;
			}
		}
		@include media-max(sm) {
			margin: 0 1.375rem 1rem;
		}
	}

	.team-members {
		h2 {
			justify-content: center;
			@include media-max(sm) {
				margin-bottom: 2rem;
			}
		}
		@include media-max(sm) {
			min-height: 100vh;
		}
	}
	:global(.team-member-part) {
		@include media-min(sm) {
			margin-top: 100px;

		}
	}
	:global(.team-member-part .row .col-md-6:nth-child(odd)) {
		@include media-min(sm) {
			margin-top: -100px;
		}
	}
	:global(.team-member-part .row) {
		--bs-gutter-x: 1.5rem;
	}
	.memberModal {
		display: flex;
		align-items: flex-start;

		@include media-max(md) {
			display: unset;
		}

		&__image {
			width: 45%;
			z-index: 9;
			text-align: end;
			@include media-max(default) {
				img {
					width: 30.938rem;
				}
			}
			@include media-max(lg) {
				img {
					width: 100%;
				}
			}
			@include media-max(md) {
				text-align: center;
				width: 100%;
				min-height: 33vh;
				img {
					width: 85%;
				}
			}
		}

		&__details {
			width: 60%;
			min-width: 60%;
			background-color: $lightblue;
			padding: 2.5rem 2.5rem 2.5rem 5.5rem;
			box-shadow: 6px 8px 9px rgba(166, 184, 191, 0.2);
			margin-left: -3rem;
			margin-top: 3.563rem;
			height: 55vh;

			@include media-max(xl) {
				height: 45vh;
			}

			@include media-max(md) {
				width: 100%;
				min-width: 100%;
				margin-top: -3rem;
				padding: 5.5rem 2.5rem 2.5rem 2.5rem;
				margin-left: 0;
				min-height: unset;
				height: auto;
			}

			@include media-max(sm) {
				padding: 5.5rem 1.5rem 2.5rem 1.5rem;
			}

			h5 {
				font-size: 2.688rem;
				text-transform: uppercase;
				font-weight: 500;

				@include media-max(md) {
					text-align: center;
				}
				@include media-max(sm) {
					font-size: 1.8rem;
				}
				:global(span) {
					color: $primary-color;
				}
			}

			.position {
				font-size: 1.438rem;
				letter-spacing: 0.02em;
				font-feature-settings: 'pnum' on, 'lnum' on;
				color: $darkergray;
				font-weight: 500;
				margin-bottom: 2rem;

				@include media-max(md) {
					text-align: center;
				}
			}

			.content {
				font-style: normal;
				font-weight: 400;
				font-size: 1.25rem;
				line-height: 2.125rem;
				font-feature-settings: 'pnum' on, 'lnum' on;
				color: $darkergray;
				height: 13rem;
				overflow-x: hidden;
				overflow-y: auto;

				@include scrollbars(0.824rem, 80px, $secondary-color, $white-color);

				:global(p) {
					max-width: 32.843rem;

					@include media-max(md) {
						max-width: unset;
					}
				}

				@include media-max(md) {
					text-align: center;
					overflow: hidden;
					height: auto;
				}
			}
		}
	}
	:global(.team-members .inner-col) {
		@include media-max(lg) {
			margin-left: unset;
			width: 100%;
		}
	}
</style>
