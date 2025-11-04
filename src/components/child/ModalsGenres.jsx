import { useCallback } from "react";
import "./modals.css";
function ModalsGenres({
	close,
	open,
	genresAll,
	selectedGenres,
	setSelectedGenres,
}) {
	const handleClick = useCallback(
		(id) => {
			if (selectedGenres.includes(id)) {
				setSelectedGenres((prev) =>
					prev.filter((itemId) => itemId !== id)
				);
			} else {
				setSelectedGenres((prev) => [...prev, id]);
			}
		},
		[setSelectedGenres]
	);
	if (!open) return null;

	return (
		<>
			<div
				className="modals__sheet"
				role="dialog"
				aria-modal="true"
				aria-labelledby="genres-sheet-title"
				// 'hidden' здесь, вероятно, должен управляться состоянием (state)
				// hidden
			>
				<div className="modals__sheetInner">
					<div className="modals__sheetHead">
						<h3 id="genres-sheet-title">Все жанры</h3>
						<button
							className="modals__sheetClose"
							type="button"
							aria-label="Закрыть"
							onClick={close}
						>
							×
						</button>
					</div>

					<div className="modals__sheetTools">
						<label className="modals__searchInSheet">
							<span className="sr-only">Поиск по жанрам</span>
							<input type="text" placeholder="Найти жанр" />
						</label>
						<button className="modals__reset" type="button">
							Сбросить
						</button>
					</div>

					<ul
						className="modals__list"
						role="listbox"
						aria-multiselectable="true"
					>
						{genresAll.map((m) => (
							<li
								key={m.id}
								className="modals__item"
								role="option"
								aria-selected={false}
							>
								<label
									className="modals__check"
									onClick={() => handleClick(m.id)}
								>
									<input type="checkbox" />
									<span>{m.name}</span>
								</label>
							</li>
						))}
					</ul>

					<div className="modals__sheetActions">
						<button className="modals__btnSecondary" type="button">
							Отмена
						</button>
						<button className="modals__btnPrimary" type="button">
							Применить
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
export default ModalsGenres;
