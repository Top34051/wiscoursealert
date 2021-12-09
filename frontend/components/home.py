import streamlit as st

from .utils import valid_user_id, get_watch_list, show_course_info


def edit_course():
    print('hello')


def course_id_mapping(x):
    return st.session_state['course_map'][x]


def app():

    st.title('wiscoursealert 🦡')

    # ask for user id
    if st.session_state['user_id'] == None:
        with st.form(key='user_id_form'):
            user_id = st.text_input(
                'Enter your user ID', autocomplete='username')
            st.form_submit_button(label='Login')
        if valid_user_id(user_id):
            st.session_state['user_id'] = user_id
            st.experimental_rerun()
        elif user_id != '' and user_id != None:
            st.error(
                'We can\'t find this user ID. Please make sure to enter the right one.')

    else:
        # welcome message
        message = '### Welcome back! user <span style="color:#DB4437">{}</span>.'.format(
            st.session_state['user_id'])
        st.markdown(message, unsafe_allow_html=True)

        # select watch list
        watch_list = get_watch_list(st.session_state['user_id'])
        course_list = [course['course_id'] for course in watch_list]
        selected_courses = st.multiselect(
            'Your watching list', course_list, default=st.session_state['selected_courses'], format_func=course_id_mapping)
        if selected_courses != st.session_state['selected_courses']:
            st.session_state['selected_courses'] = selected_courses
            st.experimental_rerun()

        # show courses infomation
        for course in watch_list:
            if course['course_id'] in selected_courses:
                show_course_info(course)

        # edit watch list
        edit_course()
