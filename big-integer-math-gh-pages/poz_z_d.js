/*
	Модуль Z - 2 : Определение положительности целого числа.
	-- Автор : Карлин Захар , 5302.
*/
MathLib.poz_z_d = function(n)
{
	// Если число 0, значит, число и не положительное, и не отрицательное.
	if (!MathLib.nzer_n_b(n)) {
		return 0;
	}
	return n.s > 0 ? 2 : 1;
}