<script lang="ts">
	import './styles/global.css';
	import { fly, scale } from 'svelte/transition';
	let hasBegun: boolean = false;

	let err;

	let drink = getDrink();
	async function getDrink() {
		hasBegun = true;
		try {
			const req = await fetch(
				'https://thecocktaildb.com/api/json/v1/1/random.php',
			);
			const res = await req.json();
			const drinks = res.drinks[0];

			drinks.ingredients = [
				{ ingredient: drinks.strIngredient1, amount: drinks.strMeasure1 },
				{ ingredient: drinks.strIngredient2, amount: drinks.strMeasure2 },
				{ ingredient: drinks.strIngredient3, amount: drinks.strMeasure3 },
				{ ingredient: drinks.strIngredient4, amount: drinks.strMeasure4 },
				{ ingredient: drinks.strIngredient5, amount: drinks.strMeasure5 },
				{ ingredient: drinks.strIngredient6, amount: drinks.strMeasure6 },
				{ ingredient: drinks.strIngredient7, amount: drinks.strMeasure7 },
				{ ingredient: drinks.strIngredient8, amount: drinks.strMeasure8 },
				{ ingredient: drinks.strIngredient9, amount: drinks.strMeasure9 },
				{ ingredient: drinks.strIngredient10, amount: drinks.strMeasure10 },
				{ ingredient: drinks.strIngredient11, amount: drinks.strMeasure11 },
				{ ingredient: drinks.strIngredient12, amount: drinks.strMeasure12 },
				{ ingredient: drinks.strIngredient13, amount: drinks.strMeasure13 },
				{ ingredient: drinks.strIngredient14, amount: drinks.strMeasure14 },
				{ ingredient: drinks.strIngredient15, amount: drinks.strMeasure15 },
			].filter((ing) => ing.ingredient !== null && ing.ingredient !== '');
			console.log(drinks);

			return drinks;
		} catch (err) {}
	}
</script>

<main>
	{#if !hasBegun}
		<h1 in:fly={{ duration: 300, x: -100 }}>
			<span class="highlighter">Hello There</span>
		</h1>
		<p in:fly={{ duration: 300, x: -100 }}>
			Welcome to the <span class="title-font">Random Drink Picker</span>. It is
			just what it says on the tin: you hit the button and it gives you a random
			drink and how to make it. Go nuts, chief. Hit the
			<em>big green button</em> to start.
		</p>
	{/if}

	{#await drink}
		<h1 class="loading">Fetching A Drink...</h1>
	{:then drink}
		<h1 class="drink-name" in:fly={{ duration: 300, y: -100 }}>
			<span class="highlighter">{drink.strDrink}</span>
		</h1>
		<img
			src={drink.strDrinkThumb}
			alt={drink.strDrink}
			width="480"
			height="480"
		/>

		<section in:fly={{ duration: 300, x: -100 }}>
			<h2><span class="highlighter">Ingredients</span></h2>
			<ul>
				{#each drink.ingredients as ingredient}
					<li>
						<strong>{ingredient.ingredient}</strong>
						{#if ingredient.amount}
							- {ingredient.amount}
						{/if}
					</li>
				{/each}
			</ul>
		</section>

		<section in:fly={{ duration: 300, x: -100 }}>
			<h2><span class="highlighter">Instructions</span></h2>
			<p>{drink.strInstructions}</p>
		</section>
		<button class="big-btn" on:click={() => (drink = getDrink())}
			>Get A Drink</button
		>
	{:catch error}
		<h2>Uh Oh</h2>
	{/await}
</main>
