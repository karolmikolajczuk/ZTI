#include "ConvertingHTML.hpp"


int main()
{
	std::cout << __FUNCTION__ << '\n';
	try {
		parseFile("before.html");
	}
	catch (std::exception e) {
		std::cout << e.what();
	}
	return 2;
}
