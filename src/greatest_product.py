def three_greatest_integers_product(integer_list):

    """
    :param integer_list: list of unsorted integers
    :return: the product of the thre greatest integers in the input list
    """

    descending_sorted_list = []

    while integer_list:  #runs until all of the elements in integer_list have been sorted

        maximum = integer_list[0]  #Initial value for comparison
        for integer in integer_list:
            if integer > maximum:  #Checks if the some items in the list is greater than the current maximum
                maximum = integer

        descending_sorted_list.append(maximum)
        integer_list.remove(maximum)

    greatest_number = descending_sorted_list[0]
    second_greatest_number = descending_sorted_list[1]
    third_greatest_number = descending_sorted_list[2]

    return greatest_number * second_greatest_number * third_greatest_number

print(three_greatest_integers_product([1,2,3,4,5,5]))
