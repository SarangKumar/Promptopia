"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		setUpProviders();
	}, []);
	return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link
				href="/"
				className="flex gap-2 flex-center"
			>
				<Image
					className="object-contain"
					src="/assets/images/logo.svg"
					height={30}
					width={30}
					alt="user avatar"
				/>
				<p className="logo_text">Promptopia</p>
			</Link>

			{/* Desktop NAv */}
			<div className="sm:flex hidden">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5">
						<Link
							href="/create-prompt"
							className="black_btn"
						>
							Create Post
						</Link>
						<button
							type="button"
							onClick={signOut}
							className="outline_btn"
						>
							Sign Out
						</button>
						<Link href="/profile">
							<Image
								src={session?.user.image}
								height={37}
								width={37}
								alt="profile"
								className="rounded-full"
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									key={provider.name}
									type="button"
									onClick={() => signIn(provider.id)}
									className="black_btn"
								>
									SignIn
								</button>
							))}
					</>
				)}
			</div>

			{/* Mobile nav */}
			<div className="sm:hidden relative flex">
				{session?.user ? (
					<div className="flex">
						<Image
							src={session?.user.image}
							height={37}
							onClick={() => setToggleDropdown((prev) => !prev)}
							width={37}
							alt="profile"
							className="rounded-full"
						/>

						{toggleDropdown && (
							<div className="dropdown">
								<Link
									href="/profile"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									My Profile
								</Link>
								<Link
									href="/create-prompt"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									Create Prompt
								</Link>
								<button
									className="mt-5 w-full black_btn"
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}
									type="button"
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									key={provider.name}
									type="button"
									onClick={() => signIn(provider.id)}
									className="black_btn"
								>
									SignIn
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
